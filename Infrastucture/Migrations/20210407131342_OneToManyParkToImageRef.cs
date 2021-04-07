using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastucture.Migrations
{
    public partial class OneToManyParkToImageRef : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ParkCode",
                table: "Parks",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ParkCode",
                table: "ImageReferences",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Parks_ParkCode",
                table: "Parks",
                column: "ParkCode");

            migrationBuilder.CreateIndex(
                name: "IX_ImageReferences_ParkCode",
                table: "ImageReferences",
                column: "ParkCode");

            migrationBuilder.AddForeignKey(
                name: "FK_ImageReferences_Parks_ParkCode",
                table: "ImageReferences",
                column: "ParkCode",
                principalTable: "Parks",
                principalColumn: "ParkCode",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ImageReferences_Parks_ParkCode",
                table: "ImageReferences");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Parks_ParkCode",
                table: "Parks");

            migrationBuilder.DropIndex(
                name: "IX_ImageReferences_ParkCode",
                table: "ImageReferences");

            migrationBuilder.AlterColumn<string>(
                name: "ParkCode",
                table: "Parks",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "ParkCode",
                table: "ImageReferences",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);
        }
    }
}
