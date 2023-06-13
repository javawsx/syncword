const Router = require('koa-router')
const router = new Router()

router.get('/login', async (ctx, next) => {
  await ctx.render('Auth/login', { title: 'Login', layout: false })
})

router.get('/register', async (ctx, next) => {
  await ctx.render('Auth/register', { title: 'Register', layout: false })
})

router.get('/forgot-password', async (ctx, next) => {
  await ctx.render('Auth/forgot-password', { title: 'ForgotPassword' })
})

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Dashboard',
    page_title: 'Dashboard',
    folder: 'Dashboards',
    user_name: ctx.session.username,
    auth: ctx.session.is_admin ? '管理员' : '普通用户',
    email: ctx.session.email,
  })
})

router.get('/index', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Dashboard',
    page_title: 'Dashboard',
    folder: 'Dashboards',
    user_name: ctx.session.username,
    auth: ctx.session.is_admin ? '管理员' : '普通用户',
    email: ctx.session.email,
  })
})

router.get('/pages-profile-settings', async (ctx, next) => {
  await ctx.render('pages-profile-settings', {
    title: 'Profile',
    user_name: ctx.session.username,
    auth: ctx.session.is_admin ? '管理员' : '普通用户',
    email: ctx.session.email,
  })
})

router.get('/auth-logout-basic', async (ctx, next) => {
  await ctx.render('auth-logout-basic', {
    title: 'Logout',
  })
})

router.get('/auth-404-basic', async (ctx, next) => {
  await ctx.render('auth-404-basic', {
    title: '404 Error',
  })
})

router.get('/auth-500', async (ctx, next) => {
  await ctx.render('auth-500', {
    title: '500 Error',
  })
})

// router.get('/auth-pass-change-basic', async (ctx, next) => {
//   await ctx.render('old/auth-pass-change-basic', {
//     title: 'Change Password',
//     layout: 'layout/layout-without-nav',
//   })
// })

// router.get('/auth-offline', async (ctx, next) => {
//   await ctx.render('old/auth-offline', {
//     title: 'Offline',
//     layout: 'layout/layout-without-nav',
//   })
// })

// router.get('/auth-lockscreen-basic', async (ctx, next) => {
//   await ctx.render('old/auth-lockscreen-basic', {
//     title: 'Lock Screen',
//     layout: 'layout/layout-without-nav',
//   })
// })

// router.get('/auth-success-msg-basic', async (ctx, next) => {
//   await ctx.render('old/auth-success-msg-basic', {
//     title: 'Success Message',
//     layout: 'layout/layout-without-nav',
//   })
// })

// router.get('/auth-twostep-basic', async (ctx, next) => {
//   await ctx.render('old/auth-twostep-basic', {
//     title: 'Two Step Verification',
//     layout: 'layout/layout-without-nav',
//   })
// })

// router.get('/landing', async (ctx, next) => {
//   await ctx.render('old/landing', { title: 'Landing', layout: false })
// })
// router.get('/nft-landing', async (ctx, next) => {
//   await ctx.render('old/nft-landing', { title: 'Landing', layout: false })
// })
// router.get('/job-landing', async (ctx, next) => {
//   await ctx.render('old/job-landing', { title: 'Job Landing', layout: false })
// })

// router.get('/layouts-horizontal', async (ctx, next) => {
//   await ctx.render('old/layouts-horizontal', {
//     layout: 'layout/layout-horizontal',
//     title: 'Horizontal',
//     page_title: 'Horizontal',
//     folder: 'layout',
//   })
// })
// router.get('/layouts-detached', async (ctx, next) => {
//   await ctx.render('old/layouts-detached', {
//     layout: 'layout/layout-detached',
//     title: 'Detached',
//     page_title: 'Detached',
//     folder: 'layout',
//   })
// })
// router.get('/layouts-two-column', async (ctx, next) => {
//   await ctx.render('old/layouts-two-column', {
//     layout: 'layout/layout-twocolumn',
//     title: 'Two Column',
//     page_title: 'Two Column',
//     folder: 'layout',
//   })
// })
// router.get('/layouts-vertical-hovered', async (ctx, next) => {
//   await ctx.render('old/layouts-vertical-hovered', {
//     layout: 'layout/layout-verti-hoverd',
//     title: 'Vertical Hovered',
//     page_title: 'Vertical Hovered',
//     folder: 'layout',
//   })
// })

module.exports = router
