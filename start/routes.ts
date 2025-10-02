/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'
import HomeController from '#controllers/home_controller'
import PassesController from '#controllers/passes_controller'
import router from '@adonisjs/core/services/router'

router.get('/', [HomeController, 'home'])
router.get('/login', [AuthController, 'login'])
router.post('/login', [AuthController, 'loginPost'])
router.get('/register', [AuthController, 'register'])
router.post('/register', [AuthController, 'registerPost'])
router.post('/logout', [AuthController, 'logout'])

// Routes pour les mots de passe
router.get('/passwords/add_pass', [PassesController, 'add_pass'])
router.post('/passwords/add_pass', [PassesController, 'add_passPost'])
router.get('/passwords/edit/:id', [PassesController, 'edit'])
router.post('/passwords/edit/:id', [PassesController, 'editPost'])
router.post('/passwords/delete/:id', [PassesController, 'delete'])
