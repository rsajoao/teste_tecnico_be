import router from '@adonisjs/core/services/router'
import UserController from '#controllers/users_controller'
import ClientesController from '#controllers/clientes_controller'

const User = new UserController()
const Cliente = new ClientesController()

router.get('/', async () => ({ ok: true }))

router.post('/signup', User.signup)
router.get('/clientes', Cliente.listar)
router.get('/clientes/show/:id', Cliente.show)