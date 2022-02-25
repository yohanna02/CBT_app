import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */'../views/Home.vue')
    },
    {
        path: '/studentlogin',
        name: 'Students_login',
        component: () => import(/* webpackChunkName: "studentlogin" */'../views/studentsLogin/Students_login.vue'),
        meta: {
            title: 'Login'
        }
    },
    {
        path: '/exam',
        name: 'Students_exam',
        component: () => import(/* webpackChunkName: "exam" */'../views/studentsLogin/exam.vue'),
        meta: {
            title: 'Exams'
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;