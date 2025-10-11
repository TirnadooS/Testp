<?php
// Настройки подключения к базе данных (замените на свои данные)
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "your_database";

try {
    // Создание подключения
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Проверка, была ли отправлена форма
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
        $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
        $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

        // Подготовка и выполнение SQL-запроса
        $stmt = $conn->prepare("INSERT INTO contacts (name, email, message, created_at) VALUES (:name, :email, :message, NOW())");
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':message', $message);
        $stmt->execute();

        // Отправка email (замените на свой email)
        $to = "your-email@example.com";
        $subject = "Новое сообщение с сайта";
        $body = "Имя: $name\nEmail: $email\nСообщение: $message\nДата: " . date('Y-m-d H:i:s');
        $headers = "From: no-reply@yourdomain.com";

        if (mail($to, $subject, $body, $headers)) {
            echo json_encode(["success" => true, "message" => "Сообщение успешно отправлено!"]);
        } else {
            echo json_encode(["success" => false, "message" => "Ошибка при отправке email."]);
        }
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Ошибка подключения: " . $e->getMessage()]);
}

// Закрытие подключения
$conn = null;
?>
