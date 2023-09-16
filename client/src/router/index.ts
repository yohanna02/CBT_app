import path from "path";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { store } from "../store/index";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/studentlogin",
    name: "Students_login",
    component: () => import("../views/studentsLogin/Students_login.vue"),
    meta: {
      title: "Login",
    },
  },
  {
    path: "/exam",
    name: "Students_exam",
    component: () => import("../views/studentsLogin/exam.vue"),
    meta: {
      title: "Exams",
      startExams: true
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/admin/admin.vue"),
    meta: {
      title: "Admin",
    },
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("../views/admin/dashboard.vue"),
        meta: {
          title: "Admin Dashboard",
          requiresAuth: true
        },
      },
      {
        path: "login",
        name: "AdminLogin",
        component: () => import("../views/admin/login.vue"),
        meta: {
          title: "Admin Login",
        },
      },
      {
        path: "addclass",
        name: "addClass",
        component: () => import("../views/admin/addClass.vue"),
        meta: {
          title: "Add Class",
          requiresAuth: true
        },
      },
      {
        path: "addstudent",
        name: "addStudent",
        component: () => import("../views/admin/addStudent.vue"),
        meta: {
          title: "Add Student",
          requiresAuth: true
        },
      },
      {
        path: "settings",
        name: "Settings",
        component: () => import("../views/admin/settings.vue"),
        meta: {
          title: "Admin settings",
          requiresAuth: true
        },
      },
      {
        path: "classlist",
        name: "classlist",
        component: () => import("../views/admin/classList.vue"),
        meta: {
          title: "Admin class list",
          requiresAuth: true
        },
      },
      {
        path: "examResult",
        name: "examResult",
        component: () => import("../views/admin/examResult.vue"),
        meta: {
          title: "Exam Result",
          requiresAuth: true
        }
      },
      {
        path: "examResult/:studentResultList",
        name: "studentResultList",
        component: () => import("../views/admin/studentResult.vue"),
        meta: {
          title: "Student Result",
          requiresAuth: true
        }
      },
      {
        path: "examResult/:studentResultList/:regNo",
        name: "studentResult",
        component: () => import("../views/admin/singleStudentResult.vue"),
        meta: {
          title: "Single student Result",
          requiresAuth: true
        }
      },
      {
        path: "adminquesions",
        name: "adminSetQuesions",
        component: () => import("../views/admin/adminSetQuesions.vue"),
        meta: {
          title: "Set Quesions",
          requiresAuth: true
        },
      },
    ],
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import('../views/404.vue'),
    meta: {
      title: '404'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isLoggedIn) next({name: "AdminLogin"});
  else if (to.meta.startExams && !store.getters.getExamStatus) next({name: "Students_login"});
  else next();
});

export default router;
