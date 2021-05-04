using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastucture.Migrations
{
    public partial class AddVisitLogToDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "VisitLog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VisitedParkAppUserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    VisitedParkParkId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VisitLog", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VisitLog_VisitedParks_VisitedParkAppUserId_VisitedParkParkId",
                        columns: x => new { x.VisitedParkAppUserId, x.VisitedParkParkId },
                        principalTable: "VisitedParks",
                        principalColumns: new[] { "AppUserId", "ParkId" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_VisitLog_VisitedParkAppUserId_VisitedParkParkId",
                table: "VisitLog",
                columns: new[] { "VisitedParkAppUserId", "VisitedParkParkId" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VisitLog");
        }
    }
}
