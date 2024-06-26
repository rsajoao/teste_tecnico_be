import router from '@adonisjs/core/services/router'
import AuthController from '#controllers/auth_controller'

const Auth = new AuthController()

router.get('/', async () => {
  return {
    ok: true,
  }
})

router.post('/signup', Auth.signup)
