// 页面加载动画
window.addEventListener('load', function() {
    setTimeout(function() {
        document.querySelector('.loader').classList.add('hidden');
    }, 1000);
});

// 移动端菜单切换
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', function() {
    navLinks.classList.toggle('active');
});

// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const backToTop = document.querySelector('.back-to-top');
    
    if (window.scrollY > 100) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
    
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // 关闭移动端菜单
            navLinks.classList.remove('active');
        }
    });
});

// 返回顶部
document.querySelector('.back-to-top').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 主题切换
const themeToggle = document.querySelector('.theme-toggle');

themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
});

// 检查本地存储的主题设置
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// 技能进度条动画
function animateSkills() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
}

// 滚动动画
function animateOnScroll() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight * 0.85) {
            item.classList.add('visible');
        }
    });
}

// 项目过滤
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // 更新按钮状态
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        // 过滤项目
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// 表单提交
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 获取表单数据
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // 这里可以添加表单提交的逻辑
    console.log('表单提交:', formData);
    
    // 显示成功消息
    alert('消息已发送！我会尽快回复您。');
    
    // 重置表单
    contactForm.reset();
});

// 初始化
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);
window.addEventListener('load', animateSkills);
// AI Resume Assistant Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tab切换功能
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // 更新按钮状态
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 显示对应内容
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // 结果Tab切换功能
    const resultTabBtns = document.querySelectorAll('.result-tab-btn');
    resultTabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // 更新按钮状态
            resultTabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 显示对应内容
            document.querySelectorAll('.result-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`${tabId}-result`).classList.add('active');
        });
    });
    
    // 文件拖放功能
    const dropArea = document.getElementById('drop-area');
    const fileInput = document.getElementById('fileElem');
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight() {
        dropArea.classList.add('highlight');
    }
    
    function unhighlight() {
        dropArea.classList.remove('highlight');
    }
    
    dropArea.addEventListener('drop', handleDrop, false);
    fileInput.addEventListener('change', handleFiles, false);
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles({ target: { files } });
    }
    
    function handleFiles(e) {
        const files = e.target.files;
        if (files.length) {
            processFile(files[0]);
        }
    }
    
    function processFile(file) {
        console.log('Processing file:', file.name);
        // 这里可以添加文件处理逻辑
        showLoading();
        
        // 模拟API调用延迟
        setTimeout(() => {
            hideLoading();
            showResults();
            populateSampleData();
        }, 2000);
    }
    
    // 表单提交处理
    const resumeForm = document.getElementById('resumeForm');
    resumeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const jobTitle = document.getElementById('jobTitle').value;
        const experience = document.getElementById('experience').value;
        const skills = document.getElementById('skills').value;
        
        if (!jobTitle || !experience || !skills) {
            alert('请填写所有必填字段');
            return;
        }
        
        showLoading();
        
        // 模拟API调用延迟
        setTimeout(() => {
            hideLoading();
            showResults();
            populateSampleData();
        }, 2000);
    });
    
    function showLoading() {
        const btnText = document.getElementById('btnText');
        const btnLoader = document.getElementById('btnLoader');
        
        btnText.textContent = '分析中...';
        btnLoader.style.display = 'block';
    }
    
    function hideLoading() {
        const btnText = document.getElementById('btnText');
        const btnLoader = document.getElementById('btnLoader');
        
        btnText.textContent = '分析并优化';
        btnLoader.style.display = 'none';
    }
    
    function showResults() {
        document.getElementById('resultSection').style.display = 'block';
        // 滚动到结果部分
        document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth' });
    }
    
    function populateSampleData() {
        // 这里可以替换为实际的API响应数据
        document.getElementById('originalContent').textContent = "负责公司区块链项目的开发工作，使用Solidity编写智能合约。";
        document.getElementById('improvedContent').textContent = "作为区块链开发工程师，设计并实现了3个去中心化应用(DApp)的智能合约系统，使用Solidity编写了高效、安全的合约代码，通过单元测试和审计确保合约安全性，降低了30%的gas费用消耗。";
        
        const keywords = ["Solidity", "智能合约", "以太坊", "Web3.js", "区块链安全", "DApp开发", "Truffle", "Hardhat"];
        const keywordTags = document.getElementById('keywordTags');
        keywordTags.innerHTML = '';
        
        keywords.forEach(keyword => {
            const tag = document.createElement('span');
            tag.className = 'keyword-tag';
            tag.textContent = keyword;
            keywordTags.appendChild(tag);
        });
        
        document.getElementById('keywordMatch').style.width = '78%';
        document.getElementById('matchScore').textContent = '78% 匹配度 (优秀)';
    }
    
    // 导出简历功能
    document.getElementById('exportBtn').addEventListener('click', function() {
        alert('简历导出功能即将实现！');
        // 这里可以添加实际的导出逻辑
    });
});
// 添加技能评估按钮
const skillsSection = document.querySelector('.skills-container');
const assessBtn = document.createElement('button');
assessBtn.className = 'btn';
assessBtn.style.margin = '30px auto';
assessBtn.style.display = 'block';
assessBtn.textContent = 'AI评估我的技能水平';
skillsSection.parentNode.insertBefore(assessBtn, skillsSection.nextSibling);

assessBtn.addEventListener('click', async () => {
    // 收集项目数据
    const projects = Array.from(document.querySelectorAll('.project-card')).map(card => ({
        title: card.querySelector('h3').textContent,
        description: card.querySelector('p').textContent,
        tags: Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent)
    }));
    
    // 显示加载状态
    const originalText = assessBtn.textContent;
    assessBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 评估中...';
    
    try {
        // 调用AI API进行评估
        const response = await fetch('sk-aa664a35de6d46df8f33fbf8ab63d2cb', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_DEEPSEEK_API_KEY'
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [
                    {
                        role: "system",
                        content: "你是一个技术评估专家，负责根据项目经验评估技能水平。请分析项目描述和技术栈，给出各项技能的熟练度百分比(0-100)。只返回JSON格式的结果。"
                    },
                    {
                        role: "user",
                        content: `请根据以下项目评估技能水平：${JSON.stringify(projects)}`
                    }
                ],
                temperature: 0.3,
                response_format: { type: "json_object" }
            })
        });
        
        const data = await response.json();
        const assessment = JSON.parse(data.choices[0].message.content);
        
        // 更新技能进度条
        Object.keys(assessment).forEach(skill => {
            const skillName = skill.toLowerCase();
            document.querySelectorAll('.skill-progress').forEach(progress => {
                if (progress.nextElementSibling.textContent.toLowerCase().includes(skillName)) {
                    progress.style.width = `${assessment[skill]}%`;
                    progress.setAttribute('data-width', assessment[skill]);
                    progress.previousElementSibling.textContent = `${skill}: ${assessment[skill]}%`;
                }
            });
        });
        
        alert('AI技能评估完成！进度条已更新。');
    } catch (error) {
        console.error('Error assessing skills:', error);
        alert('评估技能时出错，请稍后再试。');
    } finally {
        assessBtn.textContent = originalText;
    }
});
// 在项目部分添加AI生成按钮
document.querySelectorAll('.project-card').forEach((card, index) => {
    const generateBtn = document.createElement('button');
    generateBtn.className = 'btn';
    generateBtn.style.marginTop = '10px';
    generateBtn.style.width = '100%';
    generateBtn.innerHTML = '<i class="fas fa-magic"></i> AI优化描述';
    
    generateBtn.addEventListener('click', async () => {
        const projectTitle = card.querySelector('h3').textContent;
        const currentDescription = card.querySelector('p').textContent;
        
        // 显示加载状态
        const originalText = generateBtn.innerHTML;
        generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 生成中...';
        
        try {
            // 调用AI API优化描述
            const response = await fetch('sk-aa664a35de6d46df8f33fbf8ab63d2cb', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer YOUR_DEEPSEEK_API_KEY'
                },
                body: JSON.stringify({
                    model: "deepseek-chat",
                    messages: [
                        {
                            role: "system",
                            content: "你是一个专业的简历写作助手，负责优化项目描述。请使描述更加专业、具体，突出技术细节和成果。"
                        },
                        {
                            role: "user",
                            content: `请优化以下项目描述，使其更加专业和有吸引力。项目标题: ${projectTitle}。当前描述: ${currentDescription}`
                        }
                    ],
                    temperature: 0.7
                })
            });
            
            const data = await response.json();
            card.querySelector('p').textContent = data.choices[0].message.content;
        } catch (error) {
            console.error('Error generating description:', error);
            alert('生成描述时出错，请稍后再试。');
        } finally {
            generateBtn.innerHTML = originalText;
        }
    });
    
    card.querySelector('.project-content').appendChild(generateBtn);
});
// 替换现有的addMessage函数中的模拟回复部分
async function getAIResponse(message) {
    try {
        // 这里使用DeepSeek API作为示例
        const response = await fetch('sk-aa664a35de6d46df8f33fbf8ab63d2cb', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_DEEPSEEK_API_KEY'
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [
                    {
                        role: "system",
                        content: "你是一个专业的简历助手，帮助用户了解孙家润的简历信息。孙家润是前端开发工程师，擅长React、Vue等前端技术。"
                    },
                    {
                        role: "user",
                        content: message
                    }
                ],
                temperature: 0.7
            })
        });
        
        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error calling AI API:', error);
        return "抱歉，我现在无法处理您的请求。请稍后再试。";
    }
}

// 修改发送消息的部分
sendMessageBtn.addEventListener('click', async () => {
    if (chatInput.value.trim() !== '') {
        const userMessage = chatInput.value.trim();
        addMessage(userMessage, true);
        chatInput.value = '';
        
        // 显示加载状态
        const loadingMessage = document.createElement('div');
        loadingMessage.className = 'message bot';
        loadingMessage.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 思考中...';
        chatMessages.appendChild(loadingMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // 获取AI回复
        const aiResponse = await getAIResponse(userMessage);
        
        // 移除加载状态
        chatMessages.removeChild(loadingMessage);
        
        // 添加AI回复
        addMessage(aiResponse, false);
    }
});