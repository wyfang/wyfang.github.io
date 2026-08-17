import { availableAnimations, createAvatar } from './avatar.js';

const host = document.querySelector('#animated-avatar');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const fallbackAlt = 'This is my avatar, I use this avatar in most places.';
const minAnimationTime = 8000;
const maxAnimationTime = 14000;
const initialAnimation = availableAnimations.includes('idle')
    ? 'idle'
    : availableAnimations[0];

let avatar = null;
let currentAnimation = null;
let animationTimer = null;

function avatarPart(parent, tagName) {
    return Array.from(parent?.children || []).find(element =>
        element.tagName.toLowerCase() === tagName
    );
}

function cutOutAvatarEyes(svg) {
    const defs = avatarPart(svg, 'defs');
    const motionLayer = avatarPart(svg, 'g');
    const head = avatarPart(motionLayer, 'path');
    const eyesLayer = head?.nextElementSibling;
    const eyes = Array.from(eyesLayer?.children || []).filter(element =>
        element.tagName.toLowerCase() === 'path'
    );

    if (!defs || !head || eyes.length !== 2) {
        throw new Error('The avatar package structure is incompatible with the eye cutout.');
    }

    const mask = document.createElementNS('http://www.w3.org/2000/svg', 'mask');
    const maskBackground = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    const maskId = 'avatar-eye-cutout-' + (
        globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2)
    );

    mask.id = maskId;
    mask.setAttribute('maskUnits', 'userSpaceOnUse');
    mask.setAttribute('x', '-150');
    mask.setAttribute('y', '-150');
    mask.setAttribute('width', '300');
    mask.setAttribute('height', '300');
    mask.style.maskType = 'luminance';

    maskBackground.setAttribute('x', '-150');
    maskBackground.setAttribute('y', '-150');
    maskBackground.setAttribute('width', '300');
    maskBackground.setAttribute('height', '300');
    maskBackground.setAttribute('fill', '#fff');
    mask.append(maskBackground);

    eyes.forEach(eye => {
        eye.style.setProperty('fill', '#000', 'important');
        mask.append(eye);
    });

    defs.append(mask);
    head.setAttribute('mask', `url(#${maskId})`);
    eyesLayer.remove();
}

function createFallbackImage() {
    const image = document.createElement('img');
    image.className = 'wifi-avatar-media';
    image.src = 'img/face.svg';
    image.alt = fallbackAlt;
    return image;
}

function restoreFallback() {
    if (!host) return;
    host.replaceChildren(createFallbackImage());
    host.removeAttribute('data-animation');
}

function clearAnimationTimer() {
    if (animationTimer !== null) window.clearTimeout(animationTimer);
    animationTimer = null;
}

function randomAnimation() {
    if (availableAnimations.length < 2) return availableAnimations[0];

    let nextAnimation;
    do {
        nextAnimation = availableAnimations[Math.floor(Math.random() * availableAnimations.length)];
    } while (nextAnimation === currentAnimation);

    return nextAnimation;
}

function playRandomAnimation() {
    if (!avatar) return;
    currentAnimation = randomAnimation();
    host.dataset.animation = currentAnimation;
    avatar.play(currentAnimation);
}

function scheduleNextAnimation() {
    clearAnimationTimer();
    if (!avatar || document.hidden || reduceMotion.matches) return;

    const delay = minAnimationTime + Math.random() * (maxAnimationTime - minAnimationTime);
    animationTimer = window.setTimeout(() => {
        playRandomAnimation();
        scheduleNextAnimation();
    }, delay);
}

function startAvatar() {
    if (!host || avatar || reduceMotion.matches || !availableAnimations.length) return;

    try {
        currentAnimation = initialAnimation;
        avatar = createAvatar(host, {
            animation: currentAnimation,
            size: '100%',
        });
        cutOutAvatarEyes(avatar.element);
        avatar.element.classList.add('wifi-avatar-media');
        avatar.element.setAttribute('aria-label', fallbackAlt);
        host.dataset.animation = currentAnimation;
        scheduleNextAnimation();
    } catch (error) {
        console.error('Animated avatar could not be started.', error);
        avatar = null;
        restoreFallback();
    }
}

function stopAvatar() {
    clearAnimationTimer();
    if (avatar) avatar.destroy();
    avatar = null;
    currentAnimation = null;
    restoreFallback();
}

if (host) {
    startAvatar();

    document.addEventListener('visibilitychange', () => {
        if (!avatar) return;

        if (document.hidden) {
            clearAnimationTimer();
            avatar.pause();
        } else {
            avatar.play(currentAnimation);
            scheduleNextAnimation();
        }
    });

    reduceMotion.addEventListener('change', event => {
        if (event.matches) stopAvatar();
        else startAvatar();
    });

}
