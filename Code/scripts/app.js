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

});

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

const showLogin = () => {
    authSection.style.display = 'block';
    projectsSection.style.display = 'none';
    tasksSection.style.display = 'none';
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
};

loginButton.addEventListener('click', showLogin);
logoutButton.addEventListener('click', logoutUser);
