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

router.get('/pages-profile-settings', async (ctx, next) => {
  await ctx.render('pages-profile-settings', {
    title: 'Profile',
    user_name: ctx.session.username,
    auth: ctx.session.is_admin ? '管理员' : '普通用户',
    email: ctx.session.email,
    user_image: ctx.session.user_image,
  })
})

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Index',
    page_title: 'Data',
    folder: 'Data',
    user_name: ctx.session.username,
    auth: ctx.session.is_admin ? '管理员' : '普通用户',
    email: ctx.session.email,
    user_image: ctx.session.user_image,
  })
})

router.get('/index', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Index',
    page_title: 'Data',
    folder: 'Data',
    user_name: ctx.session.username,
    auth: ctx.session.is_admin ? '管理员' : '普通用户',
    email: ctx.session.email,
    user_image: ctx.session.user_image,
  })
})

router.get('/player', async (ctx, next) => {
  await ctx.render('player', {
    title: 'PLayer',
    folder: 'Data',
    user_name: ctx.session.username,
    auth: ctx.session.is_admin ? '管理员' : '普通用户',
    user_image: ctx.session.user_image,
  })
})

router.get('/order', async (ctx, next) => {
  await ctx.render('order', {
    title: 'Order',
    folder: 'Data',
    user_name: ctx.session.username,
    auth: ctx.session.is_admin ? '管理员' : '普通用户',
    user_image: ctx.session.user_image,
  })
})

router.get('/game', async (ctx, next) => {
  await ctx.render('game', {
    title: 'Game',
    folder: 'Game',
    user_name: ctx.session.username,
    auth: ctx.session.is_admin ? '管理员' : '普通用户',
    user_image: ctx.session.user_image,
  })
})

router.get('/game-add', async (ctx, next) => {
  await ctx.render('game-add', {
    title: 'GameAdd',
    folder: 'Game',
    user_name: ctx.session.username,
    auth: ctx.session.is_admin ? '管理员' : '普通用户',
    user_image: ctx.session.user_image,
  })
})

router.get('/game-locale', async (ctx, next) => {
  await ctx.render('game-locale', {
    title: 'GameLocale',
    folder: 'Game',
    user_name: ctx.session.username,
    auth: ctx.session.is_admin ? '管理员' : '普通用户',
    user_image: ctx.session.user_image,
  })
})

router.get('/game-server', async (ctx, next) => {
  await ctx.render('game-server', {
    title: 'GameServer',
    folder: 'Game',
    user_name: ctx.session.username,
    auth: ctx.session.is_admin ? '管理员' : '普通用户',
    user_image: ctx.session.user_image,
  })
})

router.get('/game-shop', async (ctx, next) => {
  await ctx.render('game-shop', {
    title: 'GameShop',
    folder: 'Game',
    user_name: ctx.session.username,
    auth: ctx.session.is_admin ? '管理员' : '普通用户',
    user_image: ctx.session.user_image,
  })
})

router.get('/pack', async (ctx, next) => {
  await ctx.render('pack', {
    title: 'Pack',
    folder: 'Pack',
    user_name: ctx.session.username,
    auth: ctx.session.is_admin ? '管理员' : '普通用户',
    user_image: ctx.session.user_image,
  })
})

router.get('/pack-code', async (ctx, next) => {
  await ctx.render('pack-code', {
    title: 'PackCode',
    folder: 'Pack',
    user_name: ctx.session.username,
    auth: ctx.session.is_admin ? '管理员' : '普通用户',
    user_image: ctx.session.user_image,
  })
})

router.get('/pack-create', async (ctx, next) => {
  await ctx.render('pack-create', {
    title: 'PackCreate',
    folder: 'Pack',
    user_name: ctx.session.username,
    auth: ctx.session.is_admin ? '管理员' : '普通用户',
    user_image: ctx.session.user_image,
  })
})

router.get('/pack-item', async (ctx, next) => {
  await ctx.render('pack-item', {
    title: 'PackItem',
    folder: 'Pack',
    user_name: ctx.session.username,
    auth: ctx.session.is_admin ? '管理员' : '普通用户',
    user_image: ctx.session.user_image,
  })
})

router.get('/shop', async (ctx, next) => {
  await ctx.render('shop', {
    title: 'Shop',
    folder: 'Pack',
    user_name: ctx.session.username,
    auth: ctx.session.is_admin ? '管理员' : '普通用户',
    user_image: ctx.session.user_image,
  })
})

router.get('/faq', async (ctx, next) => {
  await ctx.render('faq', {
    title: 'FAQ',
    folder: 'System',
    user_name: ctx.session.username,
    auth: ctx.session.is_admin ? '管理员' : '普通用户',
    user_image: ctx.session.user_image,
  })
})

router.get('/faq-topic', async (ctx, next) => {
  await ctx.render('faq-topic', {
    title: 'FAQTopic',
    folder: 'System',
    user_name: ctx.session.username,
    auth: ctx.session.is_admin ? '管理员' : '普通用户',
    user_image: ctx.session.user_image,
  })
})

router.get('/news', async (ctx, next) => {
  await ctx.render('news', {
    title: 'News',
    folder: 'System',
    user_name: ctx.session.username,
    auth: ctx.session.is_admin ? '管理员' : '普通用户',
    user_image: ctx.session.user_image,
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

module.exports = router
