import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/studentlogin',
        name: 'Students_login',
        component: () => import('../views/studentsLogin/Students_login.vue'),
        meta: {
            title: 'Login'
        }
    },
    {
        path: '/exam',
        name: 'Students_exam',
        component: () => import('../views/studentsLogin/exam.vue'),
        meta: {
            title: 'Exams'
        }
    },
    {
        path: '/admin',
        name: 'AdminSection',
        component: () => import('../views/admin/admin.vue'),
        meta: {
            title: 'Admin'
        }
    },
    {
        path: '/admindashboard',
        name: 'AdminDashboard',
        component: () => import('../views/admin/adminDashboard.vue'),
        meta: {
            title: 'AdminDashboard'
        }
    },
    {
        path: '/addclass',
        name: 'addClass',
        component: () => import('../views/admin/addClass.vue'),
        meta: {
            title: 'Add Class'
        }
    },
    {
        path: '/addstudent',
        name: 'addStudent',
        component: () => import('../views/admin/addStudent.vue'),
        meta: {
            title: 'Add Student'
        }
    },
    {
        path: '/settings',
        name: 'Settings',
        component: () => import('../views/admin/settings.vue'),
        meta: {
            title: 'Admin settings'
        }
    },
    {
        path: '/classlist',
        name: 'classlist',
        component: () => import('../views/admin/classList.vue'),
        meta: {
            title: 'Admin class list'
        }
    },
    {
        path: '/studentlists',
        name: 'studentLists',
        component: () => import('../views/admin/studentLists.vue'),
        meta: {
            title: 'student Lists'
        }
    },
    {
        path: '/adminquesions',
        name: 'adminSetQuesions',
        component: () => import('../views/admin/adminSetQuesions.vue'),
        meta: {
            title: 'admin Set Quesions.vue'
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;