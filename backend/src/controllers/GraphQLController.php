<?php

namespace Controllers;

use Core\Controller;
use Core\Database;
use GraphQL\Type\Schema;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\GraphQL;
use GraphQL\Error\DebugFlag;

class GraphQLController extends Controller
{
    private $db;

    public function __construct(Database $db)
    {
        parent::__construct();
        $this->db = $db;
    }

    public function index()
    {
        $schema = new Schema([
            'query' => new ObjectType([
                'name' => 'Query',
                'fields' => [
                    'categories' => $this->getCategoriesField(),
                    'products' => $this->getProductsField()
                ]
            ])
        ]);

        $input = json_decode(file_get_contents('php://input'), true);
        $query = $input['query'];
        $variableValues = $input['variables'] ?? null;

        try {
            $result = GraphQL::executeQuery($schema, $query, null, null, $variableValues);
            $output = $result->toArray(DebugFlag::INCLUDE_DEBUG_MESSAGE);
        } catch (\Exception $e) {
            $output = ['error' => ['message' => $e->getMessage()]];
        }

        $this->json($output);
    }

    private function getCategoriesField()
    {
        return [
            'type' => Type::listOf($this->getCategoryType()),
            'resolve' => function () {
                $result = $this->db->query("SELECT * FROM categories");
                return $result->fetch_all(MYSQLI_ASSOC);
            }
        ];
    }

    private function getProductsField()
    {
        return [
            'type' => Type::listOf($this->getProductType()),
            'resolve' => function () {
                $result = $this->db->query("SELECT * FROM products");
                $products = [];
                while ($row = $result->fetch_assoc()) {
                    $row['instock'] = (bool)$row['instock'];
                    $row['gallery'] = json_decode($row['gallery']);
                    $row['prices'] = json_decode($row['prices']);
                    $row['attributes'] = json_decode($row['attributes']);
                    $products[] = $row;
                }
                return $products;
            }
        ];
    }

    private function getCategoryType()
    {
        return new ObjectType([
            'name' => 'Category',
            'fields' => [
                'id' => ['type' => Type::string()],
                'name' => ['type' => Type::string()],
                '__typename' => ['type' => Type::string()]
            ]
        ]);
    }

    private function getProductType()
    {
        return new ObjectType([
            'name' => 'Product',
            'fields' => [
                'id' => ['type' => Type::string()],
                'name' => ['type' => Type::string()],
                'category' => ['type' => Type::string()],
                'instock' => ['type' => Type::boolean()],
                'gallery' => ['type' => Type::listOf(Type::string())],
                'prices' => ['type' => Type::listOf($this->getPriceType())],
                'attributes' => ['type' => Type::listOf($this->getAttributeType())],
                'description' => ['type' => Type::string()],
                'brand' => ['type' => Type::string()],
                '__typename' => ['type' => Type::string()],
            ]
        ]);
    }

    private function getPriceType()
    {
        return new ObjectType([
            'name' => 'Price',
            'fields' => [
                'amount' => ['type' => Type::float()],
                'currency' => ['type' => $this->getCurrencyType()],
                '__typename' => ['type' => Type::string()],
            ]
        ]);
    }

    private function getCurrencyType()
    {
        return new ObjectType([
            'name' => 'Currency',
            'fields' => [
                'label' => ['type' => Type::string()],
                'symbol' => ['type' => Type::string()],
                '__typename' => ['type' => Type::string()]
            ]
        ]);
    }

    private function getAttributeType()
    {
        return new ObjectType([
            'name' => 'Attribute',
            'fields' => [
                'id' => ['type' => Type::string()],
                'name' => ['type' => Type::string()],
                'type' => ['type' => Type::string()],
                '__typename' => ['type' => Type::string()],
                'items' => ['type' => Type::listOf($this->getAttributeItemType())]
            ]
        ]);
    }

    private function getAttributeItemType()
    {
        return new ObjectType([
            'name' => 'AttributeItem',
            'fields' => [
                'displayValue' => ['type' => Type::string()],
                'value' => ['type' => Type::string()],
                'id' => ['type' => Type::string()],
                '__typename' => ['type' => Type::string()]
            ]
        ]);
    }
}
