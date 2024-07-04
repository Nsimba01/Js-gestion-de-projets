document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const registerButton = document.getElementById('register-button');
    const loginButton = document.getElementById('login-button');
    const logoutButton = document.getElementById('logout-button');
    const authSection = document.getElementById('auth-section');
    const projectsSection = document.getElementById('projects-section');
    const tasksSection = document.getElementById('tasks-section');
    const newProjectInput = document.getElementById('new-project-name');
    const addProjectButton = document.getElementById('add-project-button');
    const projectList = document.getElementById('project-list');
    const newTaskInput = document.getElementById('new-task-name');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');
    const backToProjectsButton = document.getElementById('back-to-projects-button');
    const currentProjectName = document.getElementById('current-project-name');
    let currentUser = null;
    let currentProject = null;

    const saveToLocalStorage = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    const getFromLocalStorage = (key) => {
        return JSON.parse(localStorage.getItem(key)) || [];
    };

    const registerUser = (username, password) => {
        const users = getFromLocalStorage('users');
        if (users.find(user => user.username === username)) {
            alert('Nom d\'utilisateur déjà pris.');
            return false;
        }
        users.push({ username, password });
        saveToLocalStorage('users', users);
        return true;
    };

    const loginUser = (username, password) => {
        const users = getFromLocalStorage('users');
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            currentUser = user;
            return true;
        }
        return false;
    };

    const logoutUser = () => {
        currentUser = null;
        updateAuthDisplay();
        showLogin();
    };

    const addProject = (projectName) => {
        const projects = getFromLocalStorage('projects');
        projects.push({ username: currentUser.username, name: projectName, tasks: [] });
        saveToLocalStorage('projects', projects);
        renderProjects();
    };

    const addTask = (taskName) => {
        const projects = getFromLocalStorage('projects');
        const project = projects.find(proj => proj.username === currentUser.username && proj.name === currentProject);
        if (project) {
            project.tasks.push(taskName);
            saveToLocalStorage('projects', projects);
            renderTasks();
        }
    };

    const renderProjects = () => {
        projectList.innerHTML = '';
        const projects = getFromLocalStorage('projects').filter(proj => proj.username === currentUser.username);
        projects.forEach(proj => {
            const li = document.createElement('li');
            li.textContent = proj.name;
            li.addEventListener('click', () => {
                currentProject = proj.name;
                showTasks();
            });
            projectList.appendChild(li);
        });
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        currentProjectName.textContent = currentProject;
        const projects = getFromLocalStorage('projects');
        const project = projects.find(proj => proj.username === currentUser.username && proj.name === currentProject);
        if (project) {
            project.tasks.forEach(task => {
                const li = document.createElement('li');
                li.textContent = task;
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Supprimer';
                deleteButton.addEventListener('click', () => {
                    project.tasks = project.tasks.filter(t => t !== task);
                    saveToLocalStorage('projects', projects);
                    renderTasks();
                });
                li.appendChild(deleteButton);
                taskList.appendChild(li);
            });
        }
    };

    const showLogin = () => {
        authSection.style.display = 'block';
        projectsSection.style.display = 'none';
        tasksSection.style.display = 'none';
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    };

    const showRegister = () => {
        authSection.style.display = 'block';
        projectsSection.style.display = 'none';
        tasksSection.style.display = 'none';
        registerForm.style.display = 'block';
        loginForm.style.display = 'none';
    };

    const showProjects = () => {
        authSection.style.display = 'none';
        projectsSection.style.display = 'block';
        tasksSection.style.display = 'none';
        renderProjects();
    };

    const showTasks = () => {
        authSection.style.display = 'none';
        projectsSection.style.display = 'none';
        tasksSection.style.display = 'block';
        renderTasks();
    };

    const updateAuthDisplay = () => {
        if (currentUser) {
            loginButton.style.display = 'none';
            registerButton.style.display = 'none';
            logoutButton.style.display = 'block';
        } else {
            loginButton.style.display = 'block';
            registerButton.style.display = 'block';
            logoutButton.style.display = 'none';
        }
    };

    registerButton.addEventListener('click', showRegister);
    loginButton.addEventListener('click', showLogin);
    logoutButton.addEventListener('click', logoutUser);

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        if (registerUser(username, password)) {
            showLogin();
        }
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        if (loginUser(username, password)) {
            updateAuthDisplay();
            showProjects();
        } else {
            alert('Nom d\'utilisateur ou mot de passe incorrect.');
        }
    });

    addProjectButton.addEventListener('click', () => {
        const projectName = newProjectInput.value.trim();
        if (projectName) {
            addProject(projectName);
            newProjectInput.value = '';
        }
    });

    addTaskButton.addEventListener('click', () => {
        const taskName = newTaskInput.value.trim();
        if (taskName) {
            addTask(taskName);
            newTaskInput.value = '';
        }
    });

    backToProjectsButton.addEventListener('click', showProjects);

    updateAuthDisplay();
    showLogin();
});
