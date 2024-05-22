Feature: pruebas para productos

Background:

* configure ssl = true
* def urlPagina = 'http://localhost:5000/api'
* def accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI3ZThkZWJiYy04NTFjLTQ0NTctYWFmNC0yOGViOGEwNzk3N2UiLCJlbWFpbCI6ImFudG9uaW9AZ21haWwuY29tIiwicm9sZSI6IlZlbmRlZG9yIiwibmJmIjoxNzEzMjk2MjE4LCJleHAiOjE3MTMzODI2MTgsImlhdCI6MTcxMzI5NjIxOH0.YgnFYBl9DIgkxcVl3vhC8cq5iWghrpF_Kw1rnDAmVi4'
* def IdProducto = 17;


Scenario: Obtener todos los Productos
Given url urlPagina + '/Producto'
And  header Authorization = 'Bearer ' + accessToken
When method GET
Then status 200


Scenario: Obtener un Producto por Id
Given url urlPagina + '/Producto/' + IdProducto
And  header Authorization = 'Bearer ' + accessToken
When method GET
Then status 200


Scenario: Obtener todos los Productos disponibles para ser reservados
Given url urlPagina + '/Producto/Disponibles'
And  header Authorization = 'Bearer ' + accessToken
When method GET
Then status 200


Scenario: Agregar Producto
Given url urlPagina + '/Producto'
And request { "codigo": "M01","barrio": "Parque","precio": 120000,"urlImagen": "https://static.tokkobroker.com/pictures/52105576580114907554927162648075256308048417880951189647604551581336086051372.jpg" }
And  header Authorization = 'Bearer ' + accessToken
When method POST
Then status 201


Scenario: Modificar un Producto
Given url urlPagina + '/Producto/' + IdProducto
And request { "codigo": "M03","barrio": "Parque","precio": 150000,"urlImagen": "https://static.tokkobroker.com/pictures/52105576580114907554927162648075256308048417880951189647604551581336086051372.jpg" }
And  header Authorization = 'Bearer ' + accessToken
When method PUT
Then status 200


Scenario: Eliminar Producto
Given url urlPagina + '/Producto/' + IdProducto
And  header Authorization = 'Bearer ' + accessToken
When method DELETE
Then status 204