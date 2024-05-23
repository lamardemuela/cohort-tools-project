function errorHandling(app) {
    app.use((req,res,next)=>{
        res.status(404).json({errorMessage: "Ruta no encontrada"})
    })

    app.use((error,req,res,next)=>{
        res.status(500).json({ErrorMessage: "Error interno del servidor"})
    })
}
module.exports = errorHandling