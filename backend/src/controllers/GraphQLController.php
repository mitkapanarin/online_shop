<?php

use GraphQL\Type\Schema;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\GraphQL;
use GraphQL\Error\DebugFlag;

class GraphQLController
{
  public function index()
  {
    $schema = new Schema([
      'query' => new ObjectType([
        'name' => 'Query',
        'fields' => [
          'categories' => [
            'type' => Type::listOf(new ObjectType([
              'name' => 'Category',
              'fields' => [
                'id' => ['type' => Type::string()],
                'name' => ['type' => Type::string()],
                '__typename' => ['type' => Type::string()]
              ]
            ])),
            'resolve' => function () {
              // Modify this resolver function to fetch categories from the database
              // Connect to your MySQL database
              $mysqli = new mysqli("localhost", "root", "", "shop_database");

              // Check connection
              if ($mysqli->connect_error) {
                die("Connection failed: " . $mysqli->connect_error);
              }

              // Fetch categories from the database
              $result = $mysqli->query("SELECT * FROM categories");

              $categories = [];

              if ($result->num_rows > 0) {
                // Output data of each row
                while ($row = $result->fetch_assoc()) {
                  // Create category object
                  $category = [
                    'id' => $row["id"],
                    'name' => $row["name"],
                    '__typename' => 'Category'
                  ];
                  $categories[] = $category;
                }
              }

              $mysqli->close();

              return $categories;
            }
          ],
          'products' => [
            'type' => Type::listOf(new ObjectType([
              'name' => 'Product',
              'fields' => [
                'id' => ['type' => Type::string()],
                'name' => ['type' => Type::string()],
                'instock' => ['type' => Type::boolean()],
                'gallery' => ['type' => Type::listOf(Type::string())],
                'description' => ['type' => Type::string()],
                'brand' => ['type' => Type::string()],
                '__typename' => ['type' => Type::string()],
                // Add more fields as needed
              ]
            ])),
            'resolve' => function () {
              // Modify this resolver function to fetch products from the database
              // Connect to your MySQL database
              $mysqli = new mysqli("localhost", "root", "", "shop_database");

              // Check connection
              if ($mysqli->connect_error) {
                die("Connection failed: " . $mysqli->connect_error);
              }

              // Fetch products from the database
              $result = $mysqli->query("SELECT * FROM products");

              $products = [];

              if ($result->num_rows > 0) {
                // Output data of each row
                while ($row = $result->fetch_assoc()) {
                  // Create product object
                  $product = [
                    'id' => $row["id"],
                    'name' => $row["name"],
                    'instock' => (bool)$row["instock"],
                    'gallery' => json_decode($row["gallery"]),
                    'description' => $row["description"],
                    'brand' => $row["brand"],
                    '__typename' => 'Product'
                    // Add more fields as needed
                  ];
                  $products[] = $product;
                }
              }

              $mysqli->close();

              return $products;
            }
          ]
        ]
      ])
    ]);

    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput, true);
    $query = $input['query'];
    $variableValues = isset($input['variables']) ? $input['variables'] : null;

    try {
      $result = GraphQL::executeQuery(
        $schema,
        $query,
        null,
        null,
        $variableValues
      );
      $output = $result->toArray(DebugFlag::INCLUDE_DEBUG_MESSAGE);
    } catch (\Exception $e) {
      $output = [
        'error' => [
          'message' => $e->getMessage()
        ]
      ];
    }

    header('Content-Type: application/json');
    echo json_encode($output);
  }
}
