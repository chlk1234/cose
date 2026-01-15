// 所有可支持的平台数据
// 平台配置（与 background.js 保持一致）
const PLATFORMS = [
{ id: 'wechat', name: 'WeChat', icon: 'https://res.wx.qq.com/a/wx_fed/assets/res/NTI4MWU5.ico', title: '微信公众号', type: 'wechat', url: 'https://mp.weixin.qq.com/' },
{ id: 'zhihu', name: 'Zhihu', icon: 'https://static.zhihu.com/heifetz/favicon.ico', title: '知乎', type: 'zhihu', url: 'https://www.zhihu.com/signin' },
{ id: 'toutiao', name: 'Toutiao', icon: 'https://sf3-cdn-tos.toutiaostatic.com/obj/eden-cn/uhbfnupkbps/toutiao_favicon.ico', title: '今日头条', type: 'toutiao', url: 'https://mp.toutiao.com/' },
{ id: 'baijiahao', name: 'Baijiahao', icon: 'https://pic.rmb.bdstatic.com/10e1e2b43c35577e1315f0f6aad6ba24.vnd.microsoft.icon', title: '百家号', type: 'baijiahao', url: 'https://baijiahao.baidu.com/' },
{ id: 'csdn', name: 'CSDN', icon: 'https://g.csdnimg.cn/static/logo/favicon32.ico', title: 'CSDN', type: 'csdn', url: 'https://blog.csdn.net/' },
{ id: 'juejin', name: 'Juejin', icon: 'https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/static/favicons/favicon-32x32.png', title: '掘金', type: 'juejin', url: 'https://juejin.cn/' },
{ id: 'segmentfault', name: 'SegmentFault', icon: 'https://www.google.com/s2/favicons?domain=segmentfault.com&sz=32', title: '思否', type: 'segmentfault', url: 'https://segmentfault.com/user/login' },
{ id: 'cnblogs', name: 'Cnblogs', icon: 'https://www.cnblogs.com/favicon.ico', title: '博客园', type: 'cnblogs', url: 'https://account.cnblogs.com/signin' },
{ id: 'oschina', name: 'OSChina', icon: 'https://wsrv.nl/?url=static.oschina.net/new-osc/img/favicon.ico', title: '开源中国', type: 'oschina', url: 'https://www.oschina.net/home/login' },
{ id: 'cto51', name: '51CTO', icon: 'https://www.google.com/s2/favicons?domain=51cto.com&sz=32', title: '51CTO', type: 'cto51', url: 'https://home.51cto.com/index' },
{ id: 'infoq', name: 'InfoQ', icon: 'https://static001.infoq.cn/static/write/img/write-favicon.jpg', title: 'InfoQ', type: 'infoq', url: 'https://xie.infoq.cn/' },
{ id: 'jianshu', name: 'Jianshu', icon: 'https://www.jianshu.com/favicon.ico', title: '简书', type: 'jianshu', url: 'https://www.jianshu.com/sign_in' },
{ id: 'wangyihao', name: 'Wangyihao', icon: 'https://static.ws.126.net/163/f2e/news/yxybd_pc/resource/static/share-icon.png', title: '网易号', type: 'wangyihao', url: 'https://mp.163.com/' },
{ id: 'tencentcloud', name: 'TencentCloud', icon: 'https://cloudcache.tencent-cloud.com/qcloud/favicon.ico', title: '腾讯云开发者社区', type: 'tencentcloud', url: 'https://cloud.tencent.com/developer' },
{ id: 'medium', name: 'Medium', icon: 'https://miro.medium.com/v2/resize:fill:32:32/1*sHhtYhaCe2Uc3IU0IgKwIQ.png', title: 'Medium', type: 'medium', url: 'https://medium.com' },
{ id: 'sspai', name: 'Sspai', icon: 'https://cdn-static.sspai.com/favicon/sspai.ico', title: '少数派', type: 'sspai', url: 'https://sspai.com' },
{ id: 'sohu', name: 'Sohu', icon: 'https://www.google.com/s2/favicons?domain=sohu.com&sz=32', title: '搜狐号', type: 'sohu', url: 'https://mp.sohu.com' },
{ id: 'bilibili', name: 'Bilibili', icon: 'https://www.bilibili.com/favicon.ico', title: 'B站专栏', type: 'bilibili', url: 'https://member.bilibili.com/article-text/home?newEditor=-1' },
{ id: 'weibo', name: 'Weibo', icon: 'https://weibo.com/favicon.ico', title: '微博头条', type: 'weibo', url: 'https://card.weibo.com/article/v5/editor#/draft' },
{ id: 'aliyun', name: 'Aliyun', icon: 'https://img.alicdn.com/tfs/TB1_ZXuNcfpK1RjSZFOXXa6nFXa-32-32.ico', title: '阿里云开发者社区', type: 'aliyun', url: 'https://developer.aliyun.com/article/new#/' },
{ id: 'huaweicloud', name: 'HuaweiCloud', icon: 'https://www.huaweicloud.com/favicon.ico', title: '华为云开发者博客', type: 'huaweicloud', url: 'https://bbs.huaweicloud.com/blogs/article' },
{ id: 'huaweidev', name: 'HuaweiDev', icon: 'https://developer.huawei.com/favicon.ico', title: '华为开发者文章', type: 'huaweidev', url: 'https://developer.huawei.com/consumer/cn/blog/create' },
{ id: 'twitter', name: 'Twitter', icon: 'https://abs.twimg.com/favicons/twitter.3.ico', title: 'Twitter Articles', type: 'twitter', url: 'https://x.com/compose/articles/edit/' },
]

// 存储已选择的平台
let selectedPlatforms = [];

// DOM元素
const platformList = document.getElementById('platform-list');
const addPlatformBtn = document.getElementById('add-platform-btn');
const addPlatformPanel = document.getElementById('add-platform-panel');
const closePanelBtn = document.getElementById('close-panel-btn');
const cancelBtn = document.getElementById('cancel-btn');
const saveBtn = document.getElementById('save-btn');
const platformsContainer = document.getElementById('platforms-container');
const selectAllCheckbox = document.getElementById('select-all-checkbox');
const historyBtn = document.getElementById('history-btn');
const settingsBtn = document.getElementById('settings-btn');
const refreshBtn = document.getElementById('refresh-btn');
const loginStatus = document.getElementById('login-status');

function updateSelectAllCheckboxState() {
    if (!selectAllCheckbox) {
        return;
    }
    const optionCheckboxes = platformsContainer.querySelectorAll('input[type="checkbox"]');
    if (!optionCheckboxes.length) {
        selectAllCheckbox.checked = false;
        return;
    }
    const allChecked = Array.from(optionCheckboxes).every(function(option) {
        return option.checked;
    });
    selectAllCheckbox.checked = allChecked;
}

// 初始化：从本地存储加载已选择的平台，如果没有则使用默认的前6个平台
function initSelectedPlatforms() {
    // 尝试从本地存储加载
    const savedPlatforms = localStorage.getItem('cose_selected_platforms');
    
    if (savedPlatforms) {
        try {
            const savedIds = JSON.parse(savedPlatforms);
            selectedPlatforms = PLATFORMS.filter(platform => savedIds.includes(platform.id));
        } catch (e) {
            console.error('Failed to parse saved platforms:', e);
            selectedPlatforms = PLATFORMS.slice(0, 6);
        }
    } else {
        // 默认选择前6个平台
        selectedPlatforms = PLATFORMS.slice(0, 6);
    }
    
    renderPlatformList();
}

const COSE_PLATFORM_LOGIN_STATUS = 'cose_platform_login_status';

let loginStatusTimer = null;

// 保存已选择的平台到本地存储
function saveSelectedPlatforms() {
    const platformIds = selectedPlatforms.map(platform => platform.id);
    localStorage.setItem('cose_selected_platforms', JSON.stringify(platformIds));
}

function checkSelectedPlatformsLoginStatus(forceCheck = false) {
    if (!selectedPlatforms.length || !chrome || !chrome.runtime || !chrome.runtime.sendMessage) {
        return;
    }
    if (loginStatusTimer) {
        clearTimeout(loginStatusTimer);
        loginStatusTimer = null;
    }

    loginStatus.textContent = '登录检测中...';
    loginStatus.style.color = '#fa8c16';

    // Load cached status
    let cachedStatus = {};
    try {
        const saved = localStorage.getItem(COSE_PLATFORM_LOGIN_STATUS);
        if (saved) {
            cachedStatus = JSON.parse(saved);
        }
    } catch (e) {
        console.error('Failed to parse cached status:', e);
    }

    const now = Date.now();
    const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

    const platformsToCheck = [];

    selectedPlatforms.forEach(platform => {
        const cache = cachedStatus[platform.id];
        const hasAccountInfo = cache && (cache.username || cache.avatar);
        if (!forceCheck && hasAccountInfo && (now - cache.timestamp < CACHE_DURATION)) {
            platform.loggedIn = cache.loggedIn;
            platform.username = cache.username;
            platform.avatar = cache.avatar;
        } else {
            platformsToCheck.push({ id: platform.id });
            if (cache && hasAccountInfo) {
                platform.loggedIn = cache.loggedIn;
                platform.username = cache.username;
                platform.avatar = cache.avatar;
            }
        }
    });

    // If nothing to check, update global status and return
    if (platformsToCheck.length === 0) {
        const loggedInCount = selectedPlatforms.filter(p => p.loggedIn).length;
        const delay = 500 + Math.floor(Math.random() * 1000);
        loginStatusTimer = setTimeout(function() {
            renderPlatformList();
            loginStatus.textContent = '登录检测完成';
            loginStatus.style.color = loggedInCount > 0 ? '#52c41a' : '#fa8c16';
        }, delay);
        return;
    }

    renderPlatformList();

    chrome.runtime.sendMessage(
        { type: 'CHECK_PLATFORM_STATUS', platforms: platformsToCheck },
        function(response) {
            if (!response || !response.status) {
                loginStatus.textContent = '登录检测失败';
                loginStatus.style.color = '#f5222d';
                return;
            }

            const status = response.status || {};
            const timestamp = Date.now();

            // Update platforms and cache
            platformsToCheck.forEach(p => {
                const s = status[p.id] || {};
                const platform = selectedPlatforms.find(sp => sp.id === p.id);
                if (platform) {
                    platform.loggedIn = !!s.loggedIn;
                    platform.username = s.username || '';
                    platform.avatar = s.avatar || '';
                    
                    // Update cache object
                    cachedStatus[platform.id] = {
                        loggedIn: platform.loggedIn,
                        username: platform.username,
                        avatar: platform.avatar,
                        timestamp: timestamp
                    };
                }
            });

            // Save back to local storage
            localStorage.setItem(COSE_PLATFORM_LOGIN_STATUS, JSON.stringify(cachedStatus));

            // Re-render with new data
            renderPlatformList();
            
            const loggedInCount = selectedPlatforms.filter(function(p) {
                return p.loggedIn;
            }).length;
            loginStatus.textContent = '登录检测完成';
            loginStatus.style.color = loggedInCount > 0 ? '#52c41a' : '#fa8c16';
        }
    );
}

// 渲染主界面的平台列表
function renderPlatformList() {
    platformList.innerHTML = '';
    
    if (selectedPlatforms.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'platform-item';
        emptyMessage.innerHTML = `
            <div style="width: 100%; text-align: center; color: #999; padding: 20px 0;">
                暂无平台，请点击"添加平台"选择要显示的平台
            </div>
        `;
        platformList.appendChild(emptyMessage);
        return;
    }
    
    selectedPlatforms.forEach(platform => {
        const platformItem = document.createElement('div');
        platformItem.className = 'platform-item';
        platformItem.dataset.id = platform.id;
        
        // 创建图标元素
        let iconElement = '';
        if (platform.icon.startsWith('http')) {
            // 使用图片作为图标
            iconElement = `<div class="platform-icon" style="background-image: url('${platform.icon}'); background-size: contain; background-color: #f0f0f0;"></div>`;
        } else {
            // 使用文本作为图标
            const colorMap = {
                'W': '#07c160',
                'B': '#f33',
                'T': '#f85959',
                'Z': '#0084ff',
                'C': '#ca0c16',
                'J': '#1e80ff',
                '5': '#e74c3c',
                '简': '#ea6f5a'
            };
            const bgColor = colorMap[platform.icon] || '#1890ff';
            iconElement = `<div class="platform-icon" style="background-color: ${bgColor};">${platform.icon}</div>`;
        }
        
        const isLoggedIn = !!platform.loggedIn;
        const displayName = platform.username || '';
        let accountContent = '';
        if (isLoggedIn) {
            if (platform.avatar) {
                const safeName = displayName || '';
                const safeAvatar = platform.avatar;
                accountContent = `<div class="account-display"><img class="account-avatar" src="${safeAvatar}"><span class="account-name">@${safeName}</span></div>`;
            } else if (displayName) {
                accountContent = `<span class="account-name">@${displayName}</span>`;
            } else {
                accountContent = '<span class="account-name">已登录</span>';
            }
        } else {
            accountContent = '<a class="login-link">登录</a>';
        }
        
        platformItem.innerHTML = `
            ${iconElement}
            <div class="platform-info">
                <span class="platform-name">${platform.title}</span>
                <div class="account-info">
                    ${accountContent}
                </div>
            </div>
        `;
        
        platformList.appendChild(platformItem);
    });
    
    // 为登录链接添加事件
    document.querySelectorAll('.login-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platformItem = this.closest('.platform-item');
            const platformId = platformItem.dataset.id;
            const platform = PLATFORMS.find(p => p.id === platformId);

            if (!platform) {
                return;
            }

            if (!chrome || !chrome.runtime || !chrome.runtime.sendMessage) {
                if (chrome && chrome.tabs && chrome.tabs.create) {
                    chrome.tabs.create({ url: platform.url });
                } else {
                    window.open(platform.url, '_blank');
                }
                return;
            }

            loginStatus.textContent = '登录检测中...';
            loginStatus.style.color = '#fa8c16';

            chrome.runtime.sendMessage(
                { type: 'CHECK_PLATFORM_STATUS', platforms: [{ id: platform.id }] },
                function(response) {
                    if (!response || !response.status) {
                        if (chrome && chrome.tabs && chrome.tabs.create) {
                            chrome.tabs.create({ url: platform.url });
                        } else {
                            window.open(platform.url, '_blank');
                        }
                        return;
                    }

                    const status = response.status || {};
                    const s = status[platform.id] || {};
                    const loggedIn = !!s.loggedIn;
                    const username = s.username || '';
                    const avatar = s.avatar || '';

                    let cachedStatus = {};
                    try {
                        const saved = localStorage.getItem(COSE_PLATFORM_LOGIN_STATUS);
                        if (saved) {
                            cachedStatus = JSON.parse(saved);
                        }
                    } catch (err) {
                    }

                    const timestamp = Date.now();
                    cachedStatus[platform.id] = {
                        loggedIn: loggedIn,
                        username: username,
                        avatar: avatar,
                        timestamp: timestamp
                    };
                    localStorage.setItem(COSE_PLATFORM_LOGIN_STATUS, JSON.stringify(cachedStatus));

                    const selected = selectedPlatforms.find(p => p.id === platform.id);
                    if (selected) {
                        selected.loggedIn = loggedIn;
                        selected.username = username;
                        selected.avatar = avatar;
                    }

                    if (loggedIn) {
                        renderPlatformList();
                        const loggedInCount = selectedPlatforms.filter(function(p) {
                            return p.loggedIn;
                        }).length;
                        loginStatus.textContent = '登录检测完成';
                        loginStatus.style.color = loggedInCount > 0 ? '#52c41a' : '#fa8c16';
                    } else {
                        if (chrome && chrome.tabs && chrome.tabs.create) {
                            chrome.tabs.create({ url: platform.url });
                        } else {
                            window.open(platform.url, '_blank');
                        }
                    }
                }
            );
        });
    });
}

// 渲染添加平台面板中的平台选项
function renderPlatformOptions() {
    platformsContainer.innerHTML = '';
    
    PLATFORMS.forEach(platform => {
        const isSelected = selectedPlatforms.some(p => p.id === platform.id);
        
        const platformOption = document.createElement('div');
        platformOption.className = 'platform-option';
        platformOption.dataset.id = platform.id;
        
        // 创建图标元素
        let iconElement = '';
        if (platform.icon.startsWith('http')) {
            iconElement = `<div class="platform-option-icon" style="background-image: url('${platform.icon}'); background-size: contain; background-color: #f0f0f0;"></div>`;
        } else {
            const colorMap = {
                'W': '#07c160',
                'B': '#f33',
                'T': '#f85959',
                'Z': '#0084ff',
                'C': '#ca0c16',
                'J': '#1e80ff',
                '5': '#e74c3c',
                '简': '#ea6f5a'
            };
            const bgColor = colorMap[platform.icon] || '#1890ff';
            iconElement = `<div class="platform-option-icon" style="background-color: ${bgColor};">${platform.icon}</div>`;
        }
        
        platformOption.innerHTML = `
            <div class="platform-option-checkbox">
                <input type="checkbox" id="option-${platform.id}" ${isSelected ? 'checked' : ''}>
            </div>
            <div class="platform-option-info">
                ${iconElement}
                <span class="platform-option-name">${platform.title}</span>
            </div>
        `;
        
        // 点击整行触发勾选
        platformOption.addEventListener('click', function(e) {
            // 如果直接点击的是复选框，则不需要处理，因为它自己会变
            if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
                return;
            }
            
            const checkbox = this.querySelector('input[type="checkbox"]');
            if (checkbox) {
                checkbox.checked = !checkbox.checked;
                // 手动改变checked状态不会触发change事件，需要手动触发以更新全选框状态
                checkbox.dispatchEvent(new Event('change'));
            }
        });
        
        platformsContainer.appendChild(platformOption);
    });
    
    const optionCheckboxes = platformsContainer.querySelectorAll('input[type="checkbox"]');
    optionCheckboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            updateSelectAllCheckboxState();
        });
    });
    
    updateSelectAllCheckboxState();
}

// 打开添加平台面板
function openAddPlatformPanel() {
    renderPlatformOptions();
    addPlatformPanel.classList.add('open');
}

// 关闭添加平台面板
function closeAddPlatformPanel() {
    addPlatformPanel.classList.remove('open');
}

// 保存选择的平台
function savePlatformSelection() {
    const selectedOptions = document.querySelectorAll('#platforms-container input[type="checkbox"]:checked');
    selectedPlatforms = [];
    
    selectedOptions.forEach(option => {
        const platformId = option.id.replace('option-', '');
        const platform = PLATFORMS.find(p => p.id === platformId);
        if (platform) {
            selectedPlatforms.push(platform);
        }
    });
    
    // 重新渲染主界面平台列表
    renderPlatformList();
    
    // 保存到本地存储
    saveSelectedPlatforms();
    
    // 关闭面板
    closeAddPlatformPanel();
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    //console.log('DOMContentLoaded事件触发');
    // 强制设置body尺寸
    document.body.style.width = '350px';
    document.body.style.height = '400px';
    document.body.style.minWidth = '350px';
    document.body.style.maxWidth = '350px';
    document.body.style.minHeight = '400px';
    document.body.style.maxHeight = '400px';
    document.body.style.overflow = 'hidden';
    
    // 设置html元素尺寸
    document.documentElement.style.width = '350px';
    document.documentElement.style.height = '400px';
    document.documentElement.style.overflow = 'hidden';
    
    // 初始化已选择的平台
    initSelectedPlatforms();
    checkSelectedPlatformsLoginStatus();
    
    // 事件监听
    addPlatformBtn.addEventListener('click', openAddPlatformPanel);
    closePanelBtn.addEventListener('click', closeAddPlatformPanel);
    cancelBtn.addEventListener('click', closeAddPlatformPanel);
    saveBtn.addEventListener('click', savePlatformSelection);
    
    // 历史记录按钮点击事件
    historyBtn.addEventListener('click', function() {
        alert('历史记录功能（演示）');
    });
    
    // 设置按钮点击事件
    settingsBtn.addEventListener('click', function() {
        alert('设置功能（演示）');
    });
    
    // 刷新按钮点击事件
    refreshBtn.addEventListener('click', function() {
        checkSelectedPlatformsLoginStatus(true);
    });
    
    // 登录状态文字点击事件
    loginStatus.addEventListener('click', function() {
        const platformCount = selectedPlatforms.length;
        const loggedInCount = selectedPlatforms.filter(p => p.loggedIn).length;
        alert(`当前状态：已选择 ${platformCount} 个平台，${loggedInCount} 个已登录`);
    });
    
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            const checked = selectAllCheckbox.checked;
            const optionCheckboxes = platformsContainer.querySelectorAll('input[type="checkbox"]');
            optionCheckboxes.forEach(function(option) {
                option.checked = checked;
            });
        });
    }
    
    // 防止弹窗被拉伸
    window.addEventListener('resize', function() {
        document.body.style.width = '350px';
        document.body.style.height = '400px';
    });
});
