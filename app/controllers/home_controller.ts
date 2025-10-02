import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
    async home({auth, view}: HttpContext) {
        if (auth.user) {
            const passes = await auth.user.related('passes').query()
            console.log('Passes récupérés:', passes) // Debug
            
            return view.render('pages/passwords', { passes })
        }
        else {
            return view.render('pages/home')
        }
    }
}