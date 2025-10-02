import type { HttpContext } from '@adonisjs/core/http'
import Pass from '#models/pass'

export default class PassesController {
    async add_pass({ view }: HttpContext) {
        return view.render('pages/add_pass')
    }

    async add_passPost({ auth, request, response, session }: HttpContext) {
        const { platform, username, password, logo_url } = request.only(['platform', 'username', 'password', 'logo_url'])
        
        try {
            // Récupérer l'utilisateur connecté
            const user = await auth.use('web').authenticate()
            
            // Créer le nouveau mot de passe avec l'userId
            await Pass.create({
                platform,
                username,
                password,
                logo: logo_url, // Note: le modèle utilise 'logo', pas 'logoURL'
                userId: user.id
            })
            
            session.flash({ success: 'Mot de passe ajouté avec succès.' })
            return response.redirect('/')
        } catch (error) {
            session.flash({ error: 'Erreur lors de l\'ajout du mot de passe.' })
            return response.redirect().back()
        }
    }

    async edit({ params, view, auth }: HttpContext) {
        const user = await auth.use('web').authenticate()
        const pass = await Pass.query().where('userId', user.id).where('id', params.id).firstOrFail()
        return view.render('pages/edit_pass', { pass })
    }

    async editPost({ params, request, response, auth, session }: HttpContext) {
        const { platform, username, password, logo_url } = request.only(['platform', 'username', 'password', 'logo_url'])
        
        try {
            const user = await auth.use('web').authenticate()
            const pass = await Pass.query().where('userId', user.id).where('id', params.id).firstOrFail()
            
            pass.platform = platform
            pass.username = username
            pass.password = password
            pass.logo = logo_url
            await pass.save()
            
            session.flash({ success: 'Mot de passe modifié avec succès.' })
            return response.redirect('/')
        } catch (error) {
            session.flash({ error: 'Erreur lors de la modification du mot de passe.' })
            return response.redirect().back()
        }
    }

    async delete({ params, response, auth, session }: HttpContext) {
        try {
            const user = await auth.use('web').authenticate()
            const pass = await Pass.query().where('userId', user.id).where('id', params.id).firstOrFail()
            await pass.delete()
            
            session.flash({ success: 'Mot de passe supprimé avec succès.' })
            return response.redirect('/')
        } catch (error) {
            session.flash({ error: 'Erreur lors de la suppression du mot de passe.' })
            return response.redirect().back()
        }
    }
}