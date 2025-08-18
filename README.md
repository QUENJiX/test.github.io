```C
#include <stdio.h>

struct Book{
    int id;
    char title[50];
    int stock;
};

int main(){
    struct Book inventory[100]; int book_count = 0;
    FILE *inventory_file = fopen("inventory.txt", "r");
    if(inventory_file == NULL) { printf("File doesn't exist.\n"); return 1;}

    while(fscanf(inventory_file, "%d %s %d", &inventory->id, &inventory->title, &inventory->stock) == 3){
        book_count++;
    }fclose(inventory_file);

    FILE *sales_file = fopen("sales.txt", "r");
    if(sales_file == NULL){ printf("Couldn't file open.\n"); return 1;}

    int sold_id, quantity_sold;
    while(fscanf(sales_file, "%d %d", &sold_id, &quantity_sold) == 2){
        for(int i = 0; i < book_count; i++){
            if(inventory[i].id == sold_id){
                inventory[i].stock -= quantity_sold;
                break;
            }
        }
    }fclose(sales_file);

    inventory_file = fopen("inventory.txt", "w");
    if(inventory_file == NULL){printf("Error: Could not open file.\n"); return 1;}

    for(int i = 0; i < book_count; i++){
        fprintf(inventory_file, "%d %s %d\n", inventory[i].id, inventory[i].title, inventory[i].stock);
    }fclose(inventory_file);

    printf("Inverntory update complete.\n");

    return 0;
}
```

```C
#include <stdio.h>
#include <stdlib.h>

struct Students {
    int id;
    char name[50];
    float cgpa;
};

void take_input() {
    struct Students temp;
    FILE *fp = fopen("students.txt", "a");
    if (fp == NULL) {
        printf("Error opening file.\n");
        return;
    }

    printf("Enter student ID, Name, and CGPA: ");
    scanf("%d %s %f", &temp.id, temp.name, &temp.cgpa);
    fprintf(fp, "%d %s %.2f\n", temp.id, temp.name, temp.cgpa);
    fclose(fp);
    printf("Student information added successfully.\n");
}

void show_output() {
    struct Students temp;
    int count = 0;
    FILE *fp = fopen("students.txt", "r");
    if (fp == NULL) {
        printf("File not found or cannot be opened.\n");
        return;
    }

    printf("\nStudent Records:\n");
    while (fscanf(fp, "%d %s %f", &temp.id, temp.name, &temp.cgpa) == 3) {
        printf("ID: %d, Name: %s, CGPA: %.2f\n", temp.id, temp.name, temp.cgpa);
        count++;
    }
    fclose(fp);

    if (count == 0) {
        printf("No student records found.\n");
    }
}

void edit_student() {
    int id, found = 0;
    struct Students temp;
    FILE *fp = fopen("students.txt", "r");
    FILE *temp_fp = fopen("temp.txt", "w");

    if (fp == NULL || temp_fp == NULL) {
        printf("Error opening file.\n");
        return;
    }

    printf("Enter student ID to edit: ");
    scanf("%d", &id);

    while (fscanf(fp, "%d %s %f", &temp.id, temp.name, &temp.cgpa) == 3) {
        if (temp.id == id) {
            printf("Enter new name and CGPA: ");
            scanf("%s %f", temp.name, &temp.cgpa);
            found = 1;
        }
        fprintf(temp_fp, "%d %s %.2f\n", temp.id, temp.name, temp.cgpa);
    }

    fclose(fp);
    fclose(temp_fp);
    remove("students.txt");
    rename("temp.txt", "students.txt");

    if (found) {
        printf("Student information updated successfully.\n");
    } else {
        printf("Student ID not found.\n");
    }
}

void delete_student() {
    int id, found = 0;
    struct Students temp;
    FILE *fp = fopen("students.txt", "r");
    FILE *temp_fp = fopen("temp.txt", "w");

    if (fp == NULL || temp_fp == NULL) {
        printf("Error opening file.\n");
        return;
    }

    printf("Enter student ID to delete: ");
    scanf("%d", &id);

    while (fscanf(fp, "%d %s %f", &temp.id, temp.name, &temp.cgpa) == 3) {
        if (temp.id == id) {
            found = 1;
            continue;
        }
        fprintf(temp_fp, "%d %s %.2f\n", temp.id, temp.name, temp.cgpa);
    }

    fclose(fp);
    fclose(temp_fp);
    remove("students.txt");
    rename("temp.txt", "students.txt");

    if (found) {
        printf("Student deleted successfully.\n");
    } else {
        printf("Student ID not found.\n");
    }
}

int main() {
    int choice;

    do {
        system("cls");
        printf("\nStudent Management System\n");
        printf("1. Add Student\n");
        printf("2. Show Students\n");
        printf("3. Edit Student\n");
        printf("4. Delete Student\n");
        printf("5. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                take_input();
                break;
            case 2:
                show_output();
                break;
            case 3:
                edit_student();
                break;
            case 4:
                delete_student();
                break;
            case 5:
                printf("Exiting the program.\n");
                break;
            default:
                printf("Invalid choice. Try again.\n");
        }

        if (choice != 5) {
            printf("\nPress Enter to continue...");
            getchar(); // consume leftover newline
            getchar(); // wait for Enter key
        }

    } while (choice != 5);

    return 0;
}
```
