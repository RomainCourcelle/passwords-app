import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
    async login({ view }: HttpContext) {
        return view.render('pages/login')
    }

    async loginPost({ auth, request, response, session }: HttpContext) {
        const { email, password } = request.only(['email', 'password'])
        try {
            const user = await User.verifyCredentials(email, password)
            await auth.use('web').login(user)
            session.flash('success', 'Login successful!')
            return response.redirect('/')
        } catch (error) {
            session.flash('error', 'Login failed. Please check your credentials.')
            return response.redirect('/login')
        }
    }

    async register({ view }: HttpContext) {
        return view.render('pages/register')
    }

    async registerPost({ auth, request, response, session }: HttpContext) {
        const { fullName, email, password } = request.only(['fullName', 'email', 'password'])
        try {
            const user = await User.create({ fullName, email, password })
            await auth.use('web').login(user)
            session.flash('success', 'Registration successful! You are now logged in.')
            return response.redirect('/')
        } catch (error) {
            session.flash('error', 'Registration failed. Please try again.')
            return response.redirect('/register')
        }
    }

    async logout({ auth, response, session }: HttpContext) {
        await auth.use('web').logout()
        session.flash('success', 'You have been logged out.')
        return response.redirect('/')
    }
}