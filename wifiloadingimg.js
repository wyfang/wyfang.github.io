(function(){
                function handleImg(img){
                    if(!img) return;
                    var loading = img.nextElementSibling;

                    // 如果图片已缓存并成功加载，立即处理样式
                    if(img.complete && img.naturalWidth !== 0){
                        img.style.opacity = '1';
                        if(loading){ setTimeout(function(){ loading.style.opacity='0'; setTimeout(function(){ loading.style.display='none'; },200); },200); }
                    }

                    img.addEventListener('load', function(){
                        img.style.opacity = '1';
                        if(loading){
                            setTimeout(function(){ loading.style.opacity='0'; setTimeout(function(){ loading.style.display='none'; },200); },200);
                        }
                    });

                    img.addEventListener('error', function(){
                        if(loading){ loading.style.display='block'; loading.style.opacity='1'; }
                    });
                }

                // 绑定页面已有的图片
                document.querySelectorAll('.wifi-link-img img').forEach(handleImg);

                // 如果页面上以后动态插入图片，也自动绑定
                var mo = new MutationObserver(function(muts){
                    muts.forEach(function(m){
                        m.addedNodes.forEach(function(node){
                            if(node.nodeType !== 1) return;
                            if(node.matches && node.matches('.wifi-link-img img')){
                                handleImg(node);
                            } else if(node.querySelectorAll){
                                node.querySelectorAll('.wifi-link-img img').forEach(handleImg);
                            }
                        });
                    });
                });
                mo.observe(document.body, { childList: true, subtree: true });
            })();