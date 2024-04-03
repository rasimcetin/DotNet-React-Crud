using DotNet_React_Crud.Model;
using Microsoft.EntityFrameworkCore;

namespace DotNet_React_Crud.Data;

public class TodoContext : DbContext
{
    public TodoContext(DbContextOptions<TodoContext> options) : base(options) { }

    public DbSet<TodoItem> TodoItems { get; set; }
}
