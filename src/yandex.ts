export const yandex = [
    {
        "openapi": "3.0.1",
        "info": {
            "title": "API для интеграции сервиса Яндекс.Еда",
            "description": "Описание API для работы с сервисом Яндекс.Еда по моделям Yandex и Marketplace. Все методы описанные ниже должны быть реализованы на стороне партнера в процессе интеграции. Т.е. сервис Яндекс.Еда выступает в роли клиента, а Вам необходимо реализовать серверную часть. Общение происходит на основании pull-модели, т.е. сервис Яндекс.Еда как клиент запрашивает информацию о ресурсе либо может создавать/обновлять ресурсы если это необходимо.\n\n# Authentication\n\n<!-- ReDoc-Inject: <security-definitions> -->",
            "version": "1.0-oas3",
            "x-logo": {
                "url": "public/logo.svg",
                "altText": "Yandex.Eda logo"
            }
        },
        "servers": [
            {
                "url": "/"
            }
        ],
        "tags": [
            {
                "name": "Authentication",
                "description": "Аутентификация в системе"
            },
            {
                "name": "Menu",
                "description": "Меню"
            },
            {
                "name": "Orders",
                "description": "Прием и обновление заказов от Яндекс.Еды"
            },
            {
                "name": "RestaurantList",
                "description": "Список заведений партнера"
            }
        ],
        "security": [
            {
                "OAuth2": [
                    "read",
                    "write"
                ]
            }
        ],
        "paths": {
            "/security/oauth/token": {
                "post": {
                    "tags": [
                        "Authentication"
                    ],
                    "summary": "Аутентификация в системе",
                    "operationId": "partner.auth.post",
                    "security": [],
                    "requestBody": {
                        "content": {
                            "application/x-www-form-urlencoded": {
                                "schema": {
                                    "$ref": "#/components/schemas/AuthenticationRequest"
                                }
                            }
                        },
                        "required": true
                    },
                    "responses": {
                        "200": {
                            "description": "Успешная аутентификация",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/AuthenticationResponse"
                                    }
                                }
                            }
                        },
                        "400": {
                            "description": "Ошибка в параметрах, в ответе список ошибок валидации",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/ErrorList"
                                    }
                                }
                            }
                        },
                        "500": {
                            "description": "Внутренние ошибки сервера",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/ErrorList"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/menu/{restaurantId}/composition": {
                "get": {
                    "security": [
                        {
                            "OAuth2": [
                                "read"
                            ]
                        }
                    ],
                    "tags": [
                        "Menu"
                    ],
                    "summary": "Выдача актуального на текущий момент меню ресторана",
                    "description": "Позиции, содержащие схематические или логические несоответствия (слишком длинная строка, цена равная 0.00) могут быть проигнорированы. Актуальная версия модели ответа - application/vnd.eats.menu.composition.v2+json",
                    "operationId": "partner.menu.get",
                    "parameters": [
                        {
                            "name": "restaurantId",
                            "in": "path",
                            "description": "Идентификатор ресторана в системе партнера",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "OK, возвращается актуальное на данный момент меню для указанного ресторана",
                            "content": {
                                "application/vnd.eats.menu.composition.v2+json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/MenuCompositionV2"
                                    }
                                }
                            }
                        },
                        "400": {
                            "description": "Bad request. Ошибка в параметрах, в ответе список ошибок валидации",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/ErrorList"
                                    }
                                }
                            }
                        },
                        "401": {
                            "description": "Не пройдена авторизация - истек токен, либо не был передан в запросе. Будет сделан ретрай",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/AuthorizationRequiredResponse"
                                    }
                                }
                            }
                        },
                        "404": {
                            "description": "Не найден ресторан",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/ErrorList"
                                    }
                                }
                            }
                        },
                        "500": {
                            "description": "Внутренние ошибки сервера",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/ErrorList"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/menu/{restaurantId}/availability": {
                "get": {
                    "tags": [
                        "Menu"
                    ],
                    "summary": "Выдача позиций меню недоступных для заказа на текущий момент",
                    "description": "Позиции, содержащие схематические или логические несоответствия (слишком длинная строка, остаток равен -10.00) могут быть проигнорированы.  Актуальная версия модели ответа - application/vnd.eats.menu.availability.v2+json",
                    "operationId": "partner.availability.get",
                    "parameters": [
                        {
                            "name": "restaurantId",
                            "in": "path",
                            "description": "Идентификатор ресторана в системе партнёра",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "Возвращает список позиций меню недоступных на текущий момент в данном ресторане",
                            "content": {
                                "application/vnd.eats.menu.availability.v2+json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/MenuAvailabilityV2"
                                    }
                                }
                            }
                        },
                        "401": {
                            "description": "Не пройдена авторизация - истек токен, либо не был передан в запросе. Будет сделан ретрай",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/AuthorizationRequiredResponse"
                                    }
                                }
                            }
                        },
                        "404": {
                            "description": "Не найден ресторан",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/ErrorList"
                                    }
                                }
                            }
                        },
                        "500": {
                            "description": "Внутренние ошибки сервера",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/ErrorList"
                                    }
                                }
                            }
                        }
                    },
                    "security": [
                        {
                            "OAuth2": [
                                "read",
                                "write"
                            ]
                        }
                    ]
                }
            },
            "/menu/{restaurantId}/promos": {
                "get": {
                    "tags": [
                        "Menu"
                    ],
                    "summary": "Выдача акционных блюд в связке с меню",
                    "operationId": "partner.promos.get",
                    "parameters": [
                        {
                            "name": "restaurantId",
                            "in": "path",
                            "description": "Идентификатор ресторана в системе партнёра",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "Возвращает список позиций акционных блюд меню связаных с основным меню",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/PromoItems"
                                    }
                                }
                            }
                        },
                        "401": {
                            "description": "Не пройдена авторизация - истек токен, либо не был передан в запросе. Будет сделан ретрай",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/AuthorizationRequiredResponse"
                                    }
                                }
                            }
                        },
                        "404": {
                            "description": "Не найден ресторан",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/ErrorList"
                                    }
                                }
                            }
                        },
                        "500": {
                            "description": "Внутренние ошибки сервера",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/ErrorList"
                                    }
                                }
                            }
                        }
                    },
                    "security": [
                        {
                            "OAuth2": [
                                "read"
                            ]
                        }
                    ]
                }
            },
            "/restaurants": {
                "get": {
                    "tags": [
                        "RestaurantList"
                    ],
                    "summary": "Выдача списка заведений партнера",
                    "operationId": "partner.restaurants.get",
                    "responses": {
                        "200": {
                            "description": "Возвращает список ресторанов партнера",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/RestaurantList"
                                    }
                                }
                            }
                        },
                        "401": {
                            "description": "Не пройдена авторизация - истек токен, либо не был передан в запросе. Будет сделан ретрай",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/AuthorizationRequiredResponse"
                                    }
                                }
                            }
                        },
                        "500": {
                            "description": "Внутренние ошибки сервера",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/ErrorList"
                                    }
                                }
                            }
                        }
                    },
                    "security": [
                        {
                            "OAuth2": [
                                "read"
                            ]
                        }
                    ]
                }
            },
            "/order": {
                "post": {
                    "tags": [
                        "Orders"
                    ],
                    "summary": "Создание заказа в системе ресторана",
                    "description": "MarketplaceOrder - схема заказа при доставке силами партнера. YandexOrder - схема заказа при доставке силами Яндекс.Еда. PickupOrder - схема заказа при самовывозе. Актуальная версия модели запроса - application/vnd.eats.order.v2+json",
                    "operationId": "partner.order.create",
                    "requestBody": {
                        "content": {
                            "application/vnd.eats.order.v2+json": {
                                "schema": {
                                    "oneOf": [
                                        {
                                            "$ref": "#/components/schemas/YandexOrderV2"
                                        },
                                        {
                                            "$ref": "#/components/schemas/MarketplaceOrderV2"
                                        },
                                        {
                                            "$ref": "#/components/schemas/PickupOrderV1"
                                        }
                                    ],
                                    "discriminator": {
                                        "propertyName": "discriminator",
                                        "mapping": {
                                            "marketplace": "#/components/schemas/MarketplaceOrderV2",
                                            "yandex": "#/components/schemas/YandexOrderV2",
                                            "pickup": "#/components/schemas/PickupOrderV1"
                                        }
                                    }
                                }
                            }
                        },
                        "required": true
                    },
                    "responses": {
                        "200": {
                            "description": "Заказ успешно обработан внутренней системой ресторана",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "result": {
                                                "type": "string",
                                                "example": "OK"
                                            },
                                            "orderId": {
                                                "type": "string",
                                                "description": "Идентификатор созданного заказа в системе партнера. Формат свободный. Рекомендуется UUID4",
                                                "example": "03d3b69b-331c-4f84-b2c4-888b30320e63"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            "description": "Bad request. Ошибка в параметрах, в ответе список ошибок валидации",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/ErrorList"
                                    }
                                }
                            }
                        },
                        "401": {
                            "description": "Не пройдена авторизация - истек токен, либо не был передан в запросе. Будет сделан ретрай",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/AuthorizationRequiredResponse"
                                    }
                                }
                            }
                        },
                        "500": {
                            "description": "Внутренние ошибки сервера",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/ErrorList"
                                    }
                                }
                            }
                        }
                    },
                    "security": [
                        {
                            "OAuth2": [
                                "read",
                                "write"
                            ]
                        }
                    ]
                }
            },
            "/order/{orderId}": {
                "get": {
                    "tags": [
                        "Orders"
                    ],
                    "summary": "Выдача актуальной информации о заказе в системе ресторана",
                    "description": "Актуальная версия модели ответа - application/vnd.eats.order.v2+json",
                    "operationId": "partner.order.get",
                    "parameters": [
                        {
                            "name": "orderId",
                            "in": "path",
                            "description": "Идентификатор заказа в системе партнера",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "Информация о заказе успешно выдана",
                            "content": {
                                "application/vnd.eats.order.v2+json": {
                                    "schema": {
                                        "oneOf": [
                                            {
                                                "$ref": "#/components/schemas/MarketplaceOrderV2"
                                            },
                                            {
                                                "$ref": "#/components/schemas/YandexOrderV2"
                                            },
                                            {
                                                "$ref": "#/components/schemas/PickupOrderV1"
                                            }
                                        ],
                                        "discriminator": {
                                            "propertyName": "discriminator",
                                            "mapping": {
                                                "marketplace": "#/components/schemas/MarketplaceOrderV2",
                                                "yandex": "#/components/schemas/YandexOrderV2",
                                                "pickup": "#/components/schemas/PickupOrderV1"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            "description": "Bad request. Ошибка в параметрах, в ответе список ошибок валидации",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/ErrorList"
                                    }
                                }
                            }
                        },
                        "401": {
                            "description": "Не пройдена авторизация - истек токен, либо не был передан в запросе. Будет сделан ретрай",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/AuthorizationRequiredResponse"
                                    }
                                }
                            }
                        },
                        "404": {
                            "description": "Заказ не найден в системе",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/ErrorList"
                                    }
                                }
                            }
                        },
                        "500": {
                            "description": "Внутренние ошибки сервера",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/ErrorList"
                                    }
                                }
                            }
                        }
                    },
                    "security": [
                        {
                            "OAuth2": [
                                "read",
                                "write"
                            ]
                        }
                    ]
                },
                "delete": {
                    "summary": "Отмена заказа в системе ресторана",
                    "operationId": "partner.order.cancel",
                    "tags": [
                        "Orders"
                    ],
                    "parameters": [
                        {
                            "name": "orderId",
                            "in": "path",
                            "required": true,
                            "description": "Идентификатор заказа в системе партнера",
                            "schema": {
                                "type": "string"
                            }
                        }
                    ],
                    "requestBody": {
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/OrderCancellation"
                                }
                            }
                        },
                        "required": true
                    },
                    "responses": {
                        "200": {
                            "description": "Заказ успешно отменен в ресторане"
                        },
                        "400": {
                            "description": "Bad request. Ошибка в параметрах, в ответе список ошибок валидации",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/ErrorList"
                                    }
                                }
                            }
                        },
                        "401": {
                            "description": "Не пройдена авторизация - истек токен, либо не был передан в запросе. Будет сделан ретрай",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/AuthorizationRequiredResponse"
                                    }
                                }
                            }
                        },
                        "404": {
                            "description": "Заказ не найден в системе",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/ErrorList"
                                    }
                                }
                            }
                        },
                        "500": {
                            "description": "Внутренние ошибки сервера",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/ErrorList"
                                    }
                                }
                            }
                        }
                    },
                    "security": [
                        {
                            "OAuth2": [
                                "read",
                                "write"
                            ]
                        }
                    ]
                },
                "put": {
                    "tags": [
                        "Orders"
                    ],
                    "summary": "Обновление заказа в системе ресторана",
                    "description": "Передаётся объект заказа целиком. Актуальная версия модели запроса - application/vnd.eats.order.v2+json",
                    "operationId": "partner.order.update",
                    "parameters": [
                        {
                            "name": "orderId",
                            "in": "path",
                            "required": true,
                            "description": "Идентификатор заказа в системе партнера",
                            "schema": {
                                "type": "string"
                            }
                        }
                    ],
                    "requestBody": {
                        "content": {
                            "application/vnd.eats.order.v2+json": {
                                "schema": {
                                    "oneOf": [
                                        {
                                            "$ref": "#/components/schemas/MarketplaceOrderV2"
                                        },
                                        {
                                            "$ref": "#/components/schemas/YandexOrderV2"
                                        },
                                        {
                                            "$ref": "#/components/schemas/PickupOrderV1"
                                        }
                                    ],
                                    "discriminator": {
                                        "propertyName": "discriminator",
                                        "mapping": {
                                            "marketplace": "#/components/schemas/MarketplaceOrderV2",
                                            "yandex": "#/components/schemas/YandexOrderV2",
                                            "pickup": "#/components/schemas/PickupOrderV1"
                                        }
                                    }
                                }
                            }
                        },
                        "required": true
                    },
                    "responses": {
                        "200": {
                            "description": "Обновление заказа успешно обработано внутренней системой ресторана",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "result": {
                                                "type": "string",
                                                "example": "OK"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            "description": "Bad request. Ошибка в параметрах, в ответе список ошибок валидации",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/ErrorList"
                                    }
                                }
                            }
                        },
                        "401": {
                            "description": "Не пройдена авторизация - истек токен, либо не был передан в запросе. Будет сделан ретрай.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/AuthorizationRequiredResponse"
                                    }
                                }
                            }
                        },
                        "404": {
                            "description": "Заказ не найден в системе",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/ErrorList"
                                    }
                                }
                            }
                        },
                        "422": {
                            "description": "Заказ не может быть обновлен",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/ErrorList"
                                    }
                                }
                            }
                        },
                        "500": {
                            "description": "Внутренние ошибки сервера",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/ErrorList"
                                    }
                                }
                            }
                        }
                    },
                    "security": [
                        {
                            "OAuth2": [
                                "read",
                                "write"
                            ]
                        }
                    ]
                }
            },
            "/order/{orderId}/status": {
                "get": {
                    "tags": [
                        "Orders"
                    ],
                    "summary": "Выдача актуального статуса заказа в системе ресторана",
                    "operationId": "partner.order.status",
                    "parameters": [
                        {
                            "name": "orderId",
                            "in": "path",
                            "description": "Идентификатор заказа в системе партнера",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "Статус заказа успешно выдан",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/OrderStatus"
                                    }
                                }
                            }
                        },
                        "400": {
                            "description": "Bad request. Ошибка в параметрах, в ответе список ошибок валидации",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/ErrorList"
                                    }
                                }
                            }
                        },
                        "401": {
                            "description": "Не пройдена авторизация - истек токен, либо не был передан в запросе. Будет сделан ретрай",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/AuthorizationRequiredResponse"
                                    }
                                }
                            }
                        },
                        "404": {
                            "description": "Заказ не найден в системе",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/ErrorList"
                                    }
                                }
                            }
                        },
                        "500": {
                            "description": "Внутренние ошибки сервера",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/ErrorList"
                                    }
                                }
                            }
                        }
                    },
                    "security": [
                        {
                            "OAuth2": [
                                "read",
                                "write"
                            ]
                        }
                    ]
                }
            }
        },
        "components": {
            "securitySchemes": {
                "OAuth2": {
                    "type": "oauth2",
                    "flows": {
                        "clientCredentials": {
                            "tokenUrl": "/security/oauth/token",
                            "scopes": {
                                "read": "Доступ на чтение",
                                "write": "Доступ на запись"
                            }
                        }
                    },
                    "description": "Партнер у себя дожен реализовать OAuth2 авторизацию. Минимальные требования: должен быть доступен метод для получения токена с client_id, client_secret, grand_type и scopes. Urls приведен ниже. Ссылка на полную спецификацию OAuth2 - https://tools.ietf.org/html/rfc6749"
                }
            },
            "schemas": {
                "AuthenticationRequest": {
                    "type": "object",
                    "properties": {
                        "client_id": {
                            "type": "string",
                            "example": "client_id"
                        },
                        "client_secret": {
                            "type": "string",
                            "example": "client_secret"
                        },
                        "grant_type": {
                            "type": "string",
                            "default": "client_credentials"
                        },
                        "scope": {
                            "type": "string",
                            "default": "read write"
                        }
                    },
                    "required": [
                        "client_id",
                        "client_secret",
                        "grant_type",
                        "scope"
                    ],
                    "example": {
                        "client_id": "123123123",
                        "client_secret": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                        "grant_type": "client_credentials",
                        "scope": "read write"
                    }
                },
                "AuthenticationResponse": {
                    "description": "Модель результата успешной аутентификации. Единственное обязательное поле - access_token. Остальные возможные по спецификации поля - опциональны и не используются на стороне Yandex.Eda",
                    "type": "object",
                    "properties": {
                        "access_token": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "access_token"
                    ],
                    "example": {
                        "access_token": "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                    }
                },

                "MenuCompositionV2": {
                    "type": "object",
                    "description": "Актуальная версия модели меню",
                    "properties": {
                        "categories": {
                            "type": "array",
                            "description": "Категории меню",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "id": {
                                        "maxLength": 64,
                                        "type": "string",
                                        "description": "Внутренний идентификатор категории в системе партнера. Может быть любым значением, приводимым к строке. Рекомендация - UUID4",
                                        "example": "5af86d5a-d92d-4e07-9271-aea0f7ef95a6"
                                    },
                                    "parentId": {
                                        "maxLength": 64,
                                        "type": "string",
                                        "description": "Уникальный идентификатор родительской категории для древовидной структуры. nullable: true. Не может быть пустой строкой. Ссылается на существующие категории. При загрузке адаптируется к плоской структуре категорий Яндекс.Еды (товары из подкатегорий попадают в родительские категории первого уровня)",
                                        "example": "5af86d5a-d92d-4e07-9271-aea0f7ef95a6"
                                    },
                                    "name": {
                                        "type": "string",
                                        "description": "Наименование категории (например \"Супы\")",
                                        "example": "Супы"
                                    },
                                    "sortOrder": {
                                        "type": "integer",
                                        "description": "Порядок сортировки от меньшего к большему. Если не указан, считаем за 100",
                                        "example": 0
                                    },
                                    "images": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "description": "Изображение категории ресторана",
                                            "properties": {
                                                "url": {
                                                    "type": "string",
                                                    "description": "Ссылка на изображение для скачивания",
                                                    "format": "uri"
                                                },
                                                "updatedAt": {
                                                    "type": "string",
                                                    "description": "Дата обновления изображения, в формате RFC3339 с дробной частью секунд (Y-m-d\\TH:i:s.uP)",
                                                    "format": "date-time",
                                                    "example": "1937-01-01T12:00:27.870000+00:20"
                                                }
                                            },
                                            "required": [
                                                "url",
                                                "updatedAt"
                                            ]
                                        }
                                    }
                                },
                                "required": [
                                    "id",
                                    "name"
                                ]
                            }
                        },
                        "items": {
                            "type": "array",
                            "description": "Список блюд доступных для заказа в ресторане",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "id": {
                                        "maxLength": 64,
                                        "type": "string",
                                        "description": "Внутренний идентификатор блюда в ресторане в системе партнера. Может быть любым значением, приводимым к строке. Рекомендация - UUID4",
                                        "example": "e6709e9a-d3ab-4d1e-aa69-7ce30073cbc9"
                                    },
                                    "categoryId": {
                                        "maxLength": 64,
                                        "type": "string",
                                        "description": "Идентификатор категории в системе партнера",
                                        "example": "fa494dc1-2578-4adb-a8fa-e270de8c3d28"
                                    },
                                    "name": {
                                        "type": "string",
                                        "description": "Наименование блюда в ресторане (например \"Пирожки с вишней\")",
                                        "example": "Вареники с творогом и вишней"
                                    },
                                    "description": {
                                        "type": "string",
                                        "description": "Полное описание блюда",
                                        "example": "Мука, вода, яичный порошок, вишня замороженная, творог 5%"
                                    },
                                    "price": {
                                        "type": "number",
                                        "format": "double",
                                        "description": "Цена продукта. Блюда с нулевой ценой пропускаются и не попадают в меню",
                                        "example": 1000
                                    },
                                    "vat": {
                                        "type": "number",
                                        "format": "int32",
                                        "description": "НДС, включенный в стоимость, в процентах, если не указан, считается за 0",
                                        "example": 20
                                    },
                                    "isCatchweight": {
                                        "type": "boolean",
                                        "description": "Флаг того, что позиция весовая",
                                        "default": false,
                                        "example": false
                                    },
                                    "measure": {
                                        "type": "integer",
                                        "description": "Характеристика измерений блюда - например вес или объем",
                                        "example": 666
                                    },
                                    "weightQuantum": {
                                        "type": "number",
                                        "format": "float",
                                        "description": "Наименьшее количество продукта (квант) доступное для заказа. Поле является обязательным, если значение isCatchweight равно true, иначе значение поля не используется",
                                        "example": 0.1
                                    },
                                    "measureUnit": {
                                        "type": "string",
                                        "description": "Единица измерения. Допустимые значения - граммы и миллилитры",
                                        "example": "г",
                                        "enum": [
                                            "г",
                                            "мл"
                                        ]
                                    },
                                    "nutrients":{
                                        "type": "array",
                                        "description": "Параметры КБЖУ",
                                        "required": [
                                            "calories",
                                            "proteins",
                                            "fats",
                                            "carbohydrates"
                                        ],
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "calories": {
                                                    "type": "string",
                                                    "description": "Калории",
                                                    "example": "12.50"
                                                },
                                                "proteins": {
                                                    "type": "string",
                                                    "description": "Белки",
                                                    "example": "15.30"
                                                },
                                                "fat": {
                                                    "type": "string",
                                                    "description": "Жиры",
                                                    "example": "12.50"
                                                },
                                                "carbohydrates": {
                                                    "type": "string",
                                                    "description": "Углеводы",
                                                    "example": "15.30"
                                                },
                                                "is_deactivated": {
                                                    "type": "boolean",
                                                    "description": "Признак отключения невалидных данных КБЖУ"
                                                }
                                            }
                                        }
                                    },
                                    "sortOrder": {
                                        "type": "integer",
                                        "description": "Порядок сортировки от меньшего к большему. Если не указан, считаем за 100",
                                        "example": 0
                                    },
                                    "modifierGroups": {
                                        "type": "array",
                                        "description": "Группы модификаторов для блюда",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "id": {
                                                    "type": "string",
                                                    "description": "Идентификатор группы модификаторов на стороне партнера. Может быть любым значением, приводимым к строке. Рекомендация - UUID4",
                                                    "example": "9987c815-3069-46ad-9626-74799fb22210"
                                                },
                                                "name": {
                                                    "type": "string",
                                                    "description": "Наименование группы модификаторов",
                                                    "example": "Выбор приборов"
                                                },
                                                "modifiers": {
                                                    "type": "array",
                                                    "description": "Опции, включаемые в группу",
                                                    "items": {
                                                        "type": "object",
                                                        "properties": {
                                                            "id": {
                                                                "type": "string",
                                                                "description": "Идентификатор модификатора на стороне партнера. Может быть любым значением, приводимым к строке. Рекомендация - UUID4. Этот идентификатор передаётся в заказе вместе с выбранным количеством",
                                                                "example": "916cfc99-acb4-4a96-9a42-b29159e88189"
                                                            },
                                                            "name": {
                                                                "type": "string",
                                                                "description": "Название модификатора",
                                                                "example": "Европейские приборы"
                                                            },
                                                            "price": {
                                                                "type": "number",
                                                                "format": "double",
                                                                "description": "Цена модификатора",
                                                                "example": 150
                                                            },
                                                            "vat": {
                                                                "type": "integer",
                                                                "format": "int32",
                                                                "description": "НДС, включенный в стоимость, в процентах, если не указан, считается за 0",
                                                                "example": 20
                                                            },
                                                            "minAmount": {
                                                                "type": "integer",
                                                                "minimum": 0,
                                                                "maximum": 255,
                                                                "format": "int32",
                                                                "description": "Минимальное количество указанного модификатора для блюда в заказе",
                                                                "example": 0
                                                            },
                                                            "maxAmount": {
                                                                "type": "integer",
                                                                "minimum": 0,
                                                                "maximum": 255,
                                                                "format": "int32",
                                                                "description": "Максимальное количество указанного модификатора для блюда в заказе. Также обратите внимание, что это число не должно превышать значение параметра maxSelectedModifiers в модели ModifierGroup для заказа целиком. Например вы поддерживаете 5 модификаторов в группе целиком, но максимальное значение модификатора для отдельного блюда указано 10 - такой модификатор не пройдет валидацию. Не будут загружены: некорректный модификатор, группа, к которой он принадлежит, а также пункты меню, в которых используются некорректные данные",
                                                                "example": 10
                                                            },
                                                            "serviceCodesUz": {
                                                                "type": "object",
                                                                "description": "Специальные коды для Узбекистана. Для опций НЕ является обязательным.",
                                                                "properties": {
                                                                    "mxikCodeUz": {
                                                                        "type": "string",
                                                                        "description": "mxik код опции",
                                                                        "pattern": "^\\d{17}$"
                                                                    },
                                                                    "packageCodeUz": {
                                                                        "type": "string",
                                                                        "description": "Код упаковки"
                                                                    }
                                                                },
                                                                "required": [
                                                                    "mxikCodeUz"
                                                                ]
                                                            }
                                                        },
                                                        "required": [
                                                            "id",
                                                            "maxAmount",
                                                            "minAmount",
                                                            "name",
                                                            "price"
                                                        ]
                                                    }
                                                },
                                                "minSelectedModifiers": {
                                                    "type": "integer",
                                                    "minimum": 0,
                                                    "maximum": 255,
                                                    "format": "int32",
                                                    "description": "Минимальное количество модификаторов, которые необходимо выбрать для данной группы. Не должно быть больше общего числа необходимых \"modifiers\" (с учетом их minAmount)",
                                                    "example": 0
                                                },
                                                "maxSelectedModifiers": {
                                                    "type": "integer",
                                                    "minimum": 0,
                                                    "maximum": 255,
                                                    "format": "int32",
                                                    "description": "Максимальное количество модификаторов, которые возможно выбрать для данной группы. Не должно быть меньше общего числа возможных \"modifiers\" (с учетом их maxAmount)",
                                                    "example": 10
                                                },
                                                "sortOrder": {
                                                    "type": "integer",
                                                    "description": "Порядок сортировки от меньшего к большему. Если не указан, считаем за 100",
                                                    "example": 0
                                                }
                                            },
                                            "required": [
                                                "id",
                                                "name",
                                                "minSelectedModifiers",
                                                "maxSelectedModifiers"
                                            ]
                                        }
                                    },
                                    "images": {
                                        "type": "array",
                                        "items": {
                                            "description": "Изображение блюда",
                                            "type": "object",
                                            "properties": {
                                                "hash": {
                                                    "type": "string",
                                                    "description": "SHA1-хэш от содержимого файла изображения. Рассчитывается партнером, служит признаком уникальности. В случае если он меняется, Яндекс.Еда перезагружает картинку"
                                                },
                                                "url": {
                                                    "type": "string",
                                                    "description": "Ссылка на изображение для скачивания",
                                                    "format": "uri"
                                                }
                                            },
                                            "required": [
                                                "hash",
                                                "url"
                                            ]
                                        }
                                    },
                                    "serviceCodesUz": {
                                        "type": "object",
                                        "description": "Специальные коды для Узбекистана. ПОЛЕ ОБЯЗАТЕЛЬНОЕ ДЛЯ ВСЕХ БЛЮД В UZ!",
                                        "properties": {
                                            "mxikCodeUz": {
                                                "type": "string",
                                                "description": "mxik код блюда",
                                                "pattern": "^\\d{17}$"
                                            },
                                            "packageCodeUz": {
                                                "type": "string",
                                                "description": "Код упаковки"
                                            }
                                        },
                                        "required": [
                                            "mxikCodeUz"
                                        ]
                                    }
                                },
                                "required": [
                                    "categoryId",
                                    "id",
                                    "measureUnit",
                                    "name",
                                    "price",
                                    "measure",
                                    "serviceCodesUz"
                                ]
                            }
                        },
                        "lastChange": {
                            "type": "string",
                            "description": "Дата последнего изменения меню ресторана (на стороне партнера). Важно: дата в формате RFC3339 с дробной частью секунд (Y-m-d\\TH:i:s.uP)! Если эта дата не менялась, Яндекс.Еда может в автоматическом режиме принять решение о том, что обновлять меню не требуется. Если дата обновления в этом поле отличается от даты во время последнего обновления меню, то оно будет загружено заново",
                            "format": "date-time",
                            "example": "1937-01-01T12:00:27.870000+00:20"
                        }
                    },
                    "required": [
                        "categories",
                        "lastChange",
                        "items"
                    ]
                },

                "MenuAvailabilityV2": {
                    "type": "object",
                    "description": "Актуальная версия модели доступности меню",
                    "properties": {
                        "items": {
                            "type": "array",
                            "description": "Список пунктов меню, по которым требуется изменить доступность",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "itemId": {
                                        "type": "string",
                                        "description": "Внутренний идентификатор блюда в ресторане в системе партнера. Может быть любым значением, приводимым к строке. Рекомендация - UUID4",
                                        "example": "eff0cec0-058c-4d53-b524-1c04ac24fb51"
                                    },
                                    "stock": {
                                        "type": "number",
                                        "format": "float",
                                        "description": "Остаток в ресторане. При 0 блюдо пропадает из выдачи. Не обязательное поле. Если не указан, считается за 0",
                                        "default": 0,
                                        "example": 5.5
                                    }
                                },
                                "required": [
                                    "itemId"
                                ]
                            }
                        },
                        "modifiers": {
                            "type": "array",
                            "description": "Список модификаторов блюд, по которым требуется изменить доступность",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "modifierId": {
                                        "type": "string",
                                        "description": "Внутренний идентификатор модификатора в ресторане в системе партнера. Может быть любым значением, приводимым к строке. Рекомендация - UUID4",
                                        "example": "eff0cec0-058c-4d53-b524-1c04ac24fb51"
                                    },
                                    "stock": {
                                        "type": "number",
                                        "format": "int32",
                                        "description": "Остаток в ресторане. При 0 модификатор пропадает из выдачи. Не обязательное поле. Если не указан, считается за 0",
                                        "default": 0,
                                        "example": 10
                                    }
                                },
                                "required": [
                                    "modifierId"
                                ]
                            }
                        }
                    },
                    "required": [
                        "items",
                        "modifiers"
                    ]
                },

                "PromoItems": {
                    "type": "object",
                    "properties": {
                        "promoItems": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "id": {
                                        "type": "string",
                                        "description": "ID блюда из основного меню",
                                        "example": "string"
                                    },
                                    "promoId": {
                                        "type": "string",
                                        "description": "ID акционного блюда",
                                        "example": "string"
                                    }
                                },
                                "required": [
                                    "id",
                                    "promoId"
                                ]
                            }
                        }
                    },
                    "required": [
                        "promoItems"
                    ]
                },
                "RestaurantList": {
                    "type": "object",
                    "properties": {
                        "places": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "id": {
                                        "type": "string",
                                        "description": "ID заведения в системе партнера",
                                        "example": 123
                                    },
                                    "title": {
                                        "type": "string",
                                        "description": "Название заведения",
                                        "example": "Test place"
                                    },
                                    "address": {
                                        "type": "string",
                                        "description": "Адрес заведения",
                                        "example": "City, str. Street, 1"
                                    }
                                },
                                "required": [
                                    "id",
                                    "title",
                                    "address"
                                ]
                            }
                        }
                    },
                    "required": [
                        "places"
                    ]
                },
                "YandexOrderV2": {
                    "type": "object",
                    "description": "Актуальная версия модели заказа по схеме доставки \"yandex\"",
                    "properties": {
                        "platform": {
                            "type": "string",
                            "description": "Идентификатор платформы. YE - Yandex Eda, DC - Delivery club",
                            "enum": [
                                "YE",
                                "DC"
                            ]
                        },
                        "discriminator": {
                            "type": "string",
                            "description": "Дискриминатор схемы обьекта. Для YandexOrder равен \"yandex\"",
                            "example": "yandex"
                        },
                        "eatsId": {
                            "type": "string",
                            "description": "Сквозной идентификатор заказа на стороне Яндекс.Еды в формате DDDDDD-DDDDDDD",
                            "example": "190330-1234567"
                        },
                        "restaurantId": {
                            "type": "string",
                            "description": "Внутренний идентификатор заведения в системе партнера, в которое передаётся заказ. Формат свободный, рекомендуется UUID4",
                            "example": "937c57f6-4508-4858-be7f-20691a16fbb0"
                        },
                        "deliveryInfo": {
                            "description": "Информация о доставке",
                            "type": "object",
                            "properties": {
                                "clientName": {
                                    "type": "string",
                                    "description": "Имя клиента в сервисе Яндекс.Еда",
                                    "example": "Иванов Иван Иванович"
                                },
                                "phoneNumber": {
                                    "type": "string",
                                    "description": "Номер телефона для связи с клиентом в международном формате. Состоит из частей \"+<код страны><номер>\". Может содержать добавочный номер: \"+<код страны><номер> доб. <добавочный номер>\"",
                                    "example": "+79031111111 доб. 4432"
                                },
                                "courierArrivementDate": {
                                    "type": "string",
                                    "description": "Дата, когда придет курьер в ресторан, в формате RFC3339 с дробной частью секунд (Y-m-d\\TH:i:s.uP)",
                                    "format": "date-time",
                                    "example": "1937-01-01T12:00:27.870000+00:20"
                                }
                            },
                            "required": [
                                "courierArrivementDate"
                            ]
                        },
                        "paymentInfo": {
                            "type": "object",
                            "properties": {
                                "itemsCost": {
                                    "type": "number",
                                    "format": "double",
                                    "example": 100,
                                    "description": "Полная стоимость блюд в заказе"
                                },
                                "paymentType": {
                                    "type": "string",
                                    "description": "Информация о типе оплаты. CARD - это уже оплаченный заказа, CASH - это неоплаченный заказ",
                                    "enum": [
                                        "CARD",
                                        "CASH"
                                    ]
                                }
                            },
                            "required": [
                                "itemsCost",
                                "paymentType"
                            ]
                        },
                        "items": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "id": {
                                        "type": "string",
                                        "description": "ID позиции меню в системе партнера",
                                        "example": "937c57f6-4508-4858-be7f-20691a16fbb0"
                                    },
                                    "name": {
                                        "type": "string",
                                        "description": "Наименование позиции меню",
                                        "example": "Пицца Пепперони"
                                    },
                                    "quantity": {
                                        "type": "number",
                                        "format": "float",
                                        "description": "Количество позиции в заказе",
                                        "example": 3.5
                                    },
                                    "price": {
                                        "type": "number",
                                        "format": "double",
                                        "description": "Стоимость одной данной позиции вместе со стоимостью модификаций. В следующей версии будет исправлено на чистую цену позиции без модификаций",
                                        "example": 100
                                    },
                                    "modifications": {
                                        "type": "array",
                                        "description": "Список выбранных модификаций. Может быть пустым, передаётся явно, для каждой отдельной позиции в заказе. При заказе двух позиций одного и того же блюда с разным набором модификаций - передаются разные позиции, с разными списками \"modifications\"",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "id": {
                                                    "type": "string",
                                                    "description": "ID модификатора в системе партнера",
                                                    "example": "937c57f6-4508-4858-be7f-20691a16fbb0"
                                                },
                                                "name": {
                                                    "type": "string",
                                                    "description": "Наименование модификатора",
                                                    "example": "Европейские приборы"
                                                },
                                                "quantity": {
                                                    "type": "integer",
                                                    "description": "Количество в заказе",
                                                    "example": 3
                                                },
                                                "price": {
                                                    "type": "number",
                                                    "format": "double",
                                                    "description": "Цена модификатора для пункта меню (например - дополнительный соус)",
                                                    "example": 100
                                                }
                                            },
                                            "required": [
                                                "id",
                                                "price",
                                                "quantity"
                                            ]
                                        }
                                    },
                                    "promos": {
                                        "type": "array",
                                        "description": "Список акций, действующих на текущее блюдо. Если у блюда объект \"promos\" не пустой, значит на него действует акция в системе партнера. Если пустой - это означает, что на блюдо не действуют никакие акции",
                                        "items": {
                                            "$ref": "#/components/schemas/YandexOrderV2/properties/promos/items"
                                        }
                                    }
                                },
                                "required": [
                                    "id",
                                    "modifications",
                                    "price",
                                    "quantity",
                                    "promos"
                                ]
                            }
                        },
                        "persons": {
                            "type": "integer",
                            "description": "Количество персон, на которых делается заказ. Может влиять на количество комплектов приборов",
                            "example": 2
                        },
                        "comment": {
                            "type": "string",
                            "description": "Дополнительная информация о заказе",
                            "example": "Дополнительная информация о заказе: ..."
                        },
                        "promos": {
                            "type": "array",
                            "description": "Список акций, действующих на весь заказ. Если у заказа объект \"promos\" не пустой, значит на него действует акция в системе партнера. Если пустой - это означает, что на заказ не действуют никакие акции",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "type": {
                                        "type": "string",
                                        "description": "Тип акции. Может быть подарок \"GIFT\", процентная скидка \"PERCENTAGE\", фиксированная скидка \"FIXED\"",
                                        "enum": [
                                            "GIFT",
                                            "PERCENTAGE",
                                            "FIXED"
                                        ],
                                        "example": "FIXED"
                                    },
                                    "discount": {
                                        "type": "number",
                                        "example": 100,
                                        "description": "Сума скидки в валюте"
                                    }
                                },
                                "required": [
                                    "type",
                                    "discount"
                                ]
                            }
                        }
                    },
                    "required": [
                        "discriminator",
                        "comment",
                        "nativeOrderDelivery",
                        "deliveryInfo",
                        "paymentInfo",
                        "eatsId",
                        "items",
                        "nativeOrderPayment",
                        "promos"
                    ]
                },
                "MarketplaceOrderV2": {
                    "type": "object",
                    "description": "Актуальная версия модели заказа по схеме доставки \"marketplace\"",
                    "properties": {
                        "discriminator": {
                            "type": "string",
                            "description": "Дискриминатор схемы обьекта. Для MarketplaceOrder равен \"marketplace\"",
                            "example": "marketplace"
                        },
                        "eatsId": {
                            "type": "string",
                            "description": "Сквозной идентификатор заказа на стороне Яндекс.Еды в формате DDDDDD-DDDDDDD",
                            "example": "190330-1234567"
                        },
                        "restaurantId": {
                            "type": "string",
                            "description": "Внутренний идентификатор заведения в системе партнера, в которое передаётся заказ. Формат свободный, рекомендуется UUID4",
                            "example": "937c57f6-4508-4858-be7f-20691a16fbb0"
                        },
                        "deliveryInfo": {
                            "description": "Информация о доставке",
                            "type": "object",
                            "properties": {
                                "clientName": {
                                    "type": "string",
                                    "description": "Имя клиента в сервисе Яндекс.Еда",
                                    "example": "Иванов Иван Иванович"
                                },
                                "phoneNumber": {
                                    "type": "string",
                                    "description": "Номер телефона для связи с клиентом в международном формате. Состоит из частей \"+<код страны><номер>\". Может содержать добавочный номер: \"+<код страны><номер> доб. <добавочный номер>\"",
                                    "example": "+79031111111 доб. 4432"
                                },
                                "deliveryDate": {
                                    "type": "string",
                                    "description": "Дата доставки (к которой клиент ожидает доставку заказа), в формате RFC3339 с дробной частью секунд (Y-m-d\\TH:i:s.uP)",
                                    "format": "date-time",
                                    "example": "1937-01-01T12:00:27.870000+00:20"
                                },
                                "deliveryAddress": {
                                    "description": "Информация об адресе доставки",
                                    "type": "object",
                                    "properties": {
                                        "full": {
                                            "type": "string",
                                            "description": "Полный адрес",
                                            "example": "Москва, улица Тверская, дом 1 строение 4, подъезд 2. 4-й этаж, код домофона: 123 К 4567"
                                        },
                                        "latitude": {
                                            "type": "string",
                                            "description": "Широта точки доставки",
                                            "example": "55.756994"
                                        },
                                        "longitude": {
                                            "type": "string",
                                            "description": "Долгота точки доставки",
                                            "example": "37.614006"
                                        }
                                    },
                                    "required": [
                                        "full",
                                        "latitude",
                                        "longitude"
                                    ]
                                }
                            },
                            "required": [
                                "clientName",
                                "deliveryAddress",
                                "deliveryDate",
                                "phoneNumber",
                                "type"
                            ]
                        },
                        "paymentInfo": {
                            "type": "object",
                            "properties": {
                                "paymentType": {
                                    "type": "string",
                                    "description": "Информация о типе оплаты. CARD - это уже оплаченный заказа, CASH - это неоплаченный заказ.",
                                    "enum": [
                                        "CARD",
                                        "CASH"
                                    ]
                                },
                                "itemsCost": {
                                    "type": "number",
                                    "format": "double",
                                    "example": 100,
                                    "description": "Полная сумма стоимости блюд в заказе"
                                },
                                "deliveryFee": {
                                    "type": "number",
                                    "format": "double",
                                    "example": 100,
                                    "description": "Стоимость доставки"
                                },
                                "total": {
                                    "type": "number",
                                    "format": "double",
                                    "example": 200,
                                    "description": "Общая стоимость заказа"
                                },
                                "change": {
                                    "type": "number",
                                    "format": "double",
                                    "example": 500,
                                    "description": "Сумма, с которой потребуется сдача. Другими словами, это сумма которой клиент планирует расплатиться"
                                }
                            },
                            "required": [
                                "change",
                                "deliveryFee",
                                "itemsCost",
                                "paymentType"
                            ]
                        },
                        "items": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "id": {
                                        "type": "string",
                                        "description": "ID позиции меню в системе партнера",
                                        "example": "937c57f6-4508-4858-be7f-20691a16fbb0"
                                    },
                                    "name": {
                                        "type": "string",
                                        "description": "Наименование позиции меню",
                                        "example": "Пицца Пепперони"
                                    },
                                    "quantity": {
                                        "type": "number",
                                        "format": "float",
                                        "description": "Количество позиции в заказе",
                                        "example": 3.5
                                    },
                                    "price": {
                                        "type": "number",
                                        "format": "double",
                                        "description": "Стоимость одной данной позиции вместе со стоимостью модификаций. В следующей версии будет исправлено на чистую цену позиции без модификаций",
                                        "example": 100
                                    },
                                    "modifications": {
                                        "type": "array",
                                        "description": "Список выбранных модификаций. Может быть пустым, передаётся явно, для каждой отдельной позиции в заказе. При заказе двух позиций одного и того же блюда с разным набором модификаций - передаются разные позиции, с разными списками \"modifications\"",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "id": {
                                                    "type": "string",
                                                    "description": "ID модификатора в системе партнера",
                                                    "example": "937c57f6-4508-4858-be7f-20691a16fbb0"
                                                },
                                                "name": {
                                                    "type": "string",
                                                    "description": "Наименование модификатора",
                                                    "example": "Европейские приборы"
                                                },
                                                "quantity": {
                                                    "type": "integer",
                                                    "description": "Количество в заказе",
                                                    "example": 3
                                                },
                                                "price": {
                                                    "type": "number",
                                                    "format": "double",
                                                    "description": "Цена модификатора для пункта меню (например - дополнительный соус)",
                                                    "example": 100
                                                }
                                            },
                                            "required": [
                                                "id",
                                                "price",
                                                "quantity"
                                            ]
                                        }
                                    },
                                    "promos": {
                                        "type": "array",
                                        "description": "Список акций, действующих на текущее блюдо. Если у блюда объект \"promos\" не пустой, значит на него действует акция в системе партнера. Если пустой - это означает, что на блюдо не действуют никакие акции",
                                        "items": {
                                            "$ref": "#/components/schemas/MarketplaceOrderV2/properties/promos/items"
                                        }
                                    }
                                },
                                "required": [
                                    "id",
                                    "modifications",
                                    "price",
                                    "quantity",
                                    "promos"
                                ]
                            }
                        },
                        "persons": {
                            "type": "integer",
                            "description": "Количество персон, на которых делается заказ. Может влиять на количество комплектов приборов",
                            "example": 2
                        },
                        "comment": {
                            "type": "string",
                            "description": "Дополнительная информация о заказе",
                            "example": "Дополнительная информация о заказе: ..."
                        },
                        "promos": {
                            "type": "array",
                            "description": "Список акций, действующих на весь заказ. Если у заказа объект \"promos\" не пустой, значит на него действует акция в системе партнера. Если пустой - это означает, что на заказ не действуют никакие акции",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "type": {
                                        "type": "string",
                                        "description": "Тип акции. Может быть подарок \"GIFT\", процентная скидка \"PERCENTAGE\", фиксированная скидка \"FIXED\"",
                                        "enum": [
                                            "GIFT",
                                            "PERCENTAGE",
                                            "FIXED"
                                        ],
                                        "example": "FIXED"
                                    },
                                    "discount": {
                                        "type": "number",
                                        "example": 100,
                                        "description": "Сума скидки в валюте"
                                    }
                                },
                                "required": [
                                    "type",
                                    "discount"
                                ]
                            }
                        }
                    },
                    "required": [
                        "discriminator",
                        "comment",
                        "marketplaceOrderDelivery",
                        "eatsId",
                        "items",
                        "deliveryInfo",
                        "paymentInfo",
                        "marketplaceOrderPayment",
                        "promos"
                    ]
                },
                "PickupOrderV1": {
                    "type": "object",
                    "description": "Актуальная версия модели заказа по схеме доставки \"pickup\"",
                    "properties": {
                        "discriminator": {
                            "type": "string",
                            "description": "Дискриминатор схемы обьекта. Для PickupOrder равен \"pickup\"",
                            "example": "pickup"
                        },
                        "eatsId": {
                            "type": "string",
                            "description": "Сквозной идентификатор заказа на стороне Яндекс.Еды в формате DDDDDD-DDDDDD",
                            "example": "190330-123456"
                        },
                        "restaurantId": {
                            "type": "string",
                            "description": "Внутренний идентификатор заведения в системе партнера, в которое передаётся заказ. Формат свободный, рекомендуется UUID4",
                            "example": "937c57f6-4508-4858-be7f-20691a16fbb0"
                        },
                        "deliveryInfo": {
                            "description": "Информация о доставке",
                            "type": "object",
                            "properties": {
                                "clientName": {
                                    "type": "string",
                                    "description": "Имя клиента в сервисе Яндекс.Еда",
                                    "example": "Иванов Иван Иванович"
                                },
                                "phoneNumber": {
                                    "type": "string",
                                    "description": "Номер телефона для связи с клиентом в международном формате. Состоит из частей \"+<код страны><номер>\". Может содержать добавочный номер: \"+<код страны><номер> доб. <добавочный номер>\"",
                                    "example": "+79031111111 доб. 4432"
                                },
                                "clientArrivementDate": {
                                    "type": "string",
                                    "description": "Дата, когда придет клиент в ресторан, в формате RFC3339 с дробной частью секунд (Y-m-d\\TH:i:s.uP)",
                                    "format": "date-time",
                                    "example": "1937-01-01T12:00:27.870000+00:20"
                                }
                            },
                            "required": [
                                "clientName",
                                "phoneNumber",
                                "clientArrivementDate"
                            ]
                        },
                        "paymentInfo": {
                            "type": "object",
                            "properties": {
                                "paymentType": {
                                    "type": "string",
                                    "description": "Информация о типе оплаты",
                                    "enum": [
                                        "CARD",
                                        "CASH"
                                    ]
                                },
                                "itemsCost": {
                                    "type": "number",
                                    "format": "double",
                                    "example": 100,
                                    "description": "Полная сумма стоимости блюд в заказе"
                                },
                                "total": {
                                    "type": "number",
                                    "format": "double",
                                    "example": 200,
                                    "description": "Общая стоимость заказа"
                                },
                                "change": {
                                    "type": "number",
                                    "format": "double",
                                    "example": 500,
                                    "description": "Сумма, с которой потребуется сдача. Другими словами, это сумма которой клиент планирует расплатиться"
                                }
                            },
                            "required": [
                                "change",
                                "itemsCost",
                                "paymentType"
                            ]
                        },
                        "items": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "id": {
                                        "type": "string",
                                        "description": "ID позиции меню в системе партнера",
                                        "example": "937c57f6-4508-4858-be7f-20691a16fbb0"
                                    },
                                    "name": {
                                        "type": "string",
                                        "description": "Наименование позиции меню",
                                        "example": "Пицца Пепперони"
                                    },
                                    "quantity": {
                                        "type": "number",
                                        "format": "float",
                                        "description": "Количество позиции в заказе",
                                        "example": 3.5
                                    },
                                    "price": {
                                        "type": "number",
                                        "format": "double",
                                        "description": "Стоимость одной данной позиции вместе со стоимостью модификаций. В следующей версии будет исправлено на чистую цену позиции без модификаций",
                                        "example": 100
                                    },
                                    "modifications": {
                                        "type": "array",
                                        "description": "Список выбранных модификаций. Может быть пустым, передаётся явно, для каждой отдельной позиции в заказе. При заказе двух позиций одного и того же блюда с разным набором модификаций - передаются разные позиции, с разными списками \"modifications\"",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "id": {
                                                    "type": "string",
                                                    "description": "ID модификатора в системе партнера",
                                                    "example": "937c57f6-4508-4858-be7f-20691a16fbb0"
                                                },
                                                "name": {
                                                    "type": "string",
                                                    "description": "Наименование модификатора",
                                                    "example": "Европейские приборы"
                                                },
                                                "quantity": {
                                                    "type": "integer",
                                                    "description": "Количество в заказе",
                                                    "example": 3
                                                },
                                                "price": {
                                                    "type": "number",
                                                    "format": "double",
                                                    "description": "Цена модификатора для пункта меню (например - дополнительный соус)",
                                                    "example": 100
                                                }
                                            },
                                            "required": [
                                                "id",
                                                "price",
                                                "quantity"
                                            ]
                                        }
                                    },
                                    "promos": {
                                        "type": "array",
                                        "description": "Список акций, действующих на текущее блюдо. Если у блюда объект \"promos\" не пустой, значит на него действует акция в системе партнера. Если пустой - это означает, что на блюдо не действуют никакие акции",
                                        "items": {
                                            "$ref": "#/components/schemas/PickupOrderV1/properties/promos/items"
                                        }
                                    }
                                },
                                "required": [
                                    "id",
                                    "modifications",
                                    "price",
                                    "quantity",
                                    "promos"
                                ]
                            }
                        },
                        "persons": {
                            "type": "integer",
                            "description": "Количество персон, на которых делается заказ. Может влиять на количество комплектов приборов",
                            "example": 2
                        },
                        "comment": {
                            "type": "string",
                            "description": "Дополнительная информация о заказе",
                            "example": "Дополнительная информация о заказе: ..."
                        },
                        "promos": {
                            "type": "array",
                            "description": "Список акций, действующих на весь заказ. Если у заказа объект \"promos\" не пустой, значит на него действует акция в системе партнера. Если пустой - это означает, что на заказ не действуют никакие акции",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "type": {
                                        "type": "string",
                                        "description": "Тип акции. Может быть подарок \"GIFT\", процентная скидка \"PERCENTAGE\", фиксированная скидка \"FIXED\"",
                                        "enum": [
                                            "GIFT",
                                            "PERCENTAGE",
                                            "FIXED"
                                        ],
                                        "example": "FIXED"
                                    },
                                    "discount": {
                                        "type": "number",
                                        "example": 100,
                                        "description": "Сума скидки в валюте"
                                    }
                                },
                                "required": [
                                    "type",
                                    "discount"
                                ]
                            }
                        }
                    },
                    "required": [
                        "discriminator",
                        "comment",
                        "deliveryInfo",
                        "eatsId",
                        "items",
                        "paymentInfo",
                        "promos"
                    ]
                },
                "OrderStatus": {
                    "type": "object",
                    "properties": {
                        "status": {
                            "type": "string",
                            "description": "Статус заказа. Должен быть допустимым - т.е. приготовленный заказ нельзя снова сделать новым. Переход по статусам возможен только в указанном направлении - от NEW до DELIVERED. Исключения: в статус CANCELLED заказ может перейти на любом этапе\nОписание статусов: NEW - новый, только отправлен в ресторан. ACCEPTED_BY_RESTAURANT - заказ подтвержден рестораном.  COOKING - началось приготовление заказа. READY - заказ приготовлен. TAKEN_BY_COURIER - курьер забрал заказ из ресторана. DELIVERED - заказ завершен. CANCELLED - заказ отменён.\nNEW -> ACCEPTED_BY_RESTAURANT -> COOKING -> READY -> TAKEN_BY_COURIER -> DELIVERED. Из любого статуса -> CANCELLED",
                            "enum": [
                                "NEW",
                                "ACCEPTED_BY_RESTAURANT",
                                "COOKING",
                                "READY",
                                "TAKEN_BY_COURIER",
                                "DELIVERED",
                                "CANCELLED"
                            ]
                        },
                        "comment": {
                            "maxLength": 500,
                            "type": "string",
                            "description": "Комментарий к смене статуса",
                            "example": null
                        },
                        "updatedAt": {
                            "type": "string",
                            "description": "Дата, когда сменился статус заказа, в формате RFC3339 с дробной частью секунд (Y-m-d\\TH:i:s.uP)",
                            "format": "date-time",
                            "example": "1937-01-01T12:00:27.870000+00:20"
                        }
                    },
                    "required": [
                        "status"
                    ]
                },
                "OrderCancellation": {
                    "type": "object",
                    "properties": {
                        "eatsId": {
                            "type": "string",
                            "description": "Сквозной идентификатор заказа на стороне Яндекс.Еды в формате DDDDDD-DDDDDDD",
                            "example": "190330-1234567"
                        },
                        "comment": {
                            "type": "string",
                            "description": "Описание причин отмены (может быть пустым)",
                            "example": "Отказ клиента"
                        }
                    },
                    "required": [
                        "eatsId"
                    ]
                },
                "AuthorizationRequiredResponse": {
                    "type": "object",
                    "properties": {
                        "reason": {
                            "type": "string",
                            "description": "Причина, по которой не прошла авторизация",
                            "example": "Access token has been expired. You should request a new one"
                        }
                    },
                    "required": [
                        "reason"
                    ]
                },
                "ErrorList": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "code": {
                                "type": "integer",
                                "description": "Согласованный с Яндекс.Еда числовой код ошибки",
                                "example": 100
                            },
                            "description": {
                                "type": "string",
                                "description": "Сообщение об ошибке",
                                "example": "Description of error"
                            }
                        }
                    }
                }
            }
        }
    }
]
