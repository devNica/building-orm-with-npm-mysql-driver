# conn-mysql-node-singlepattern

Es una aplicacion de NodeJS creada con el proposito de crear un pseudo-ORM
que permita realizar consultas a bases de datos MySQL y Postgres, emulando
los clasicos metodos de busqueda [findAll], [findOne], [findByPk], que pueden
ser utilizados por los modelos (tablas) de la base de datos con que se 
este trabajando, ademas permite consultas personalizadas a traves de una instancia 
directa de la clase ORM.


## Installation

descargar el repositorio desde el link de [github](https://github.com/devNica/building-orm-with-npm-mysql-driver)
abrir la carpeta que contiene el proyecto con [vscode] y correr el siguiente comando:

```bash
npm install
```

## Usage

```javascript
import foobar

# returns 'todos los registros de un pais'
url('/devnica/v1/country/all')

# returns 'El registro de un pais po su id'
url('/devnica/v1/country/only/:id')

# returns 'todos los registros de paises que pertenecen a usuarios'
url('/devnica/v1/country/related-users')

# returns 'El registro de un pais por su nombre'
url('/devnica/v1/country/name/:name')
```

## License
[MIT](https://choosealicense.com/licenses/mit/)