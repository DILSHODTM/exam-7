import swaggerJSDocs from "swagger-jsdoc";
import SwaggerUi from 'swagger-ui-express'
import { Router } from "express";

const PORT = 5000

const router = Router()
const swaggerDoc = swaggerJSDocs({
    swaggerDefinition:{
        openapi : '3.0.0',
        servers:[
            {
                url :`https://exam-e5qx.onrender.com/`,
                title: 'Server',
                description:'Masterclass api'
            }
        ],
        info:{
            title:'Masterclass API',
            version:'1.0.0',
            description:'Masterclass app'
        },
        components: {
            securitySchemes: {
                Bearer: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'token'
                }
            }
        }
    },
        apis:[
            `${process.cwd()}/src/swagger/components/*yaml`,
            `${process.cwd()}/src/swagger/docs/*yaml`,

        ]
    
})

router.use('/' , SwaggerUi.serve , SwaggerUi.setup(swaggerDoc))

export default router


