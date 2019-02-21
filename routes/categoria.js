module.exports = {
    addCategoriaPage: (req, res) => {
        res.render('add-categoria.ejs', {
            title: "Bienvenidos al Restaurante Solid" | "Agregar Una nueva Categoria"
            ,message: ''
        });
    },
    addCategoria: (req, res) => {
        
        let message = '';
        let codigo = req.body.codigo;
        let nombre = req.body.nombre;

        let insertQuery = "SELECT * FROM `categoria` WHERE nombre = '" + nombre + "'";

        db.query(insertQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'El nombre ya existe';
                res.render('add-categoria.ejs', {
                    message,
                    title: "Bienvenidos al Restaurante Solid" | "Agregar Una nueva Categoria"
                });
            } else {
                // enviar los detalles de la categoria a la base de datos
                let query = "INSERT INTO `categoria` (codigo, nombre) VALUES ('" +
                codigo + "', '" + nombre + "')";
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/');
            });
            }
        });
    },
    editCategoriaPage: (req, res) => {
        let codigo = req.params.codigo;
        let query = "SELECT * FROM `categoria` WHERE codigo = '" + codigo + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-categoria.ejs', {
                title: "Edit categoria"
                ,categoria: result[0]
                ,message: ''
            });
        });
    },
    editCategoria: (req, res) => {
        let codigo = req.params.codigo;
        let nombre = req.body.nombre;

        let query = "UPDATE `categoria` SET `nombre` = '" + nombre + "' WHERE `categoria`.`codigo` = '" + codigo + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteCategoria: (req, res) => {
        let codigo = req.params.codigo;
        let deleteCategoriaQuery = 'DELETE FROM categoria WHERE codigo = "' + codigo + '"';

        db.query(deleteCategoriaQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    }
};