using DotNet_React_Crud.Data;
using DotNet_React_Crud.Dtos;
using DotNet_React_Crud.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DotNet_React_Crud.Controllers;

[Route("api/todos")]
[ApiController]
public class TodoItemsController(TodoContext todoContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItems()
    {
        var todos = await ((from e in todoContext.TodoItems
                            orderby e.CreatedDate
                            select new UpdateTodoItem(e.Id, e.Title, e.IsCompleted, e.CreatedDate, e.UpdatedDate)).ToListAsync());

        return Ok(todos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TodoItem>> GetTodoItemById(Guid id)
    {
        var todoItem = await todoContext.TodoItems.FindAsync(id);

        if (todoItem == null)
        {
            return NotFound();
        }

        return Ok(todoItem);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<UpdateTodoItem>> UpdateTodoItem(Guid id, UpdateTodoItem updateTodoItem)
    {
        var entity = await todoContext.TodoItems.FindAsync(id);
        if (entity == null)
        {
            return NotFound();
        }

        entity.Title = updateTodoItem.title;
        entity.IsCompleted = updateTodoItem.isCompleted;
        entity.UpdatedDate = DateTimeOffset.UtcNow;

        todoContext.TodoItems.Entry(entity).State = EntityState.Modified;
        await todoContext.SaveChangesAsync();
        return Ok(updateTodoItem);
    }

    [HttpPost]
    public async Task<IActionResult> CreateTodoItem(CreateTodoItem createTodoItemDto)
    {
        if (createTodoItemDto == null)
        {
            return BadRequest();
        }

        TodoItem todoItem = new();
        todoItem.Title = createTodoItemDto.title;
        todoItem.IsCompleted = createTodoItemDto.isCompleted;
        todoItem.Id = Guid.NewGuid();

        todoContext.TodoItems.Add(todoItem);
        await todoContext.SaveChangesAsync();
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTodoItem(Guid id)
    {
        var todoItem = await todoContext.TodoItems.FindAsync(id);

        if (todoItem == null)
        {
            return NotFound();
        }

        todoContext.TodoItems.Remove(todoItem);
        await todoContext.SaveChangesAsync();

        return Ok();
    }
}
