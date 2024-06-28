import router from '@adonisjs/core/services/router'
import UserController from '#controllers/users_controller'
import ClientesController from '#controllers/clientes_controller'
import ProdutosController from '#controllers/produtos_controller'

const User = new UserController()
const Cliente = new ClientesController()
const Produto = new ProdutosController()

router.get('/', async () => ({ ok: true }))

router.post('/signup', User.signup)

router.get('/clientes', Cliente.list)
router.get('/clientes/show/:id', Cliente.show)
router.post('/clientes/store', Cliente.store)
router.put('/clientes/update/:id', Cliente.update)
router.delete('/clientes/delete/:id', Cliente.delete)

router.get('/produtos', Produto.list)
