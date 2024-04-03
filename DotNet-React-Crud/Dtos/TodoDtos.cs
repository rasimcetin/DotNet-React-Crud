namespace DotNet_React_Crud.Dtos;

public record UpdateTodoItem(Guid id, string title, bool isCompleted, DateTimeOffset createdDate, DateTimeOffset updatedDate);

public record CreateTodoItem(string title, bool isCompleted);
