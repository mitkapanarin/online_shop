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
                'prices' => ['type' => Type::listOf(new ObjectType([
                  'name' => 'Price',
                  'fields' => [
                    'amount' => ['type' => Type::float()],
                    'currency' => [
                      'type' => new ObjectType([
                        'name' => 'Currency',
                        'fields' => [
                          'label' => ['type' => Type::string()],
                          'symbol' => ['type' => Type::string()],
                          '__typename' => ['type' => Type::string()]
                        ]
                      ])
                    ],
                    '__typename' => ['type' => Type::string()],
                  ]
                ]))],
                'attributes' => ['type' => Type::listOf(new ObjectType([
                  'name' => 'Attribute',
                  'fields' => [
                    'id' => ['type' => Type::string()],
                    'name' => ['type' => Type::string()],
                    'type' => ['type' => Type::string()],
                    '__typename' => ['type' => Type::string()],
                    'items' => ['type' => Type::listOf(new ObjectType([
                      'name' => 'AttributeItem',
                      'fields' => [
                        'displayValue' => ['type' => Type::string()],
                        'value' => ['type' => Type::string()],
                        'id' => ['type' => Type::string()],
                        '__typename' => ['type' => Type::string()]
                      ]
                    ]))]
                  ]
                ]))],
                'description' => ['type' => Type::string()],
                'brand' => ['type' => Type::string()],
                '__typename' => ['type' => Type::string()],
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
                  // Parse JSON fields from the database
                  $gallery = json_decode($row["gallery"]);
                  $prices = json_decode($row["prices"]);
                  $attributes = json_decode($row["attributes"]);

                  // Create product object
                  $product = [
                    'id' => $row["id"],
                    'name' => $row["name"],
                    'instock' => (bool)$row["instock"],
                    'gallery' => $gallery,
                    'prices' => array_map(function ($price) {
                      return [
                        'amount' => $price->amount,
                        'currency' => [
                          'label' => $price->currency->label,
                          'symbol' => $price->currency->symbol,
                          '__typename' => $price->currency->__typename
                        ],
                        '__typename' => $price->__typename
                      ];
                    }, $prices),
                    'attributes' => array_map(function ($attribute) {
                      return [
                        'id' => $attribute->id,
                        'name' => $attribute->name,
                        'type' => $attribute->type,
                        '__typename' => $attribute->__typename,
                        'items' => array_map(function ($item) {
                          return [
                            'displayValue' => $item->displayValue,
                            'value' => $item->value,
                            'id' => $item->id,
                            '__typename' => $item->__typename
                          ];
                        }, $attribute->items)
                      ];
                    }, $attributes),
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
