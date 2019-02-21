module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM `categoria` ORDER BY codigo ASC"; // consulta a la base de datos para obtener todas las categorias

        // ejecución de la consulta
        db.query(query, (err, result) => {
            if (err) {
                //console.log(err)
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: "Bienvenidos al Restaurante Solid" | "Ver Categorias"
                ,categorias: result
            });
        });
    },
};

