## Problem1
```C
#include <stdio.h>
#include <string.h>

struct User {
    char username[50];
    char password[50];
};

void registerUser();
void loginUser();
int usernameExists(const char* username);
void clearInputBuffer();

int main() {
    int choice;

    do {
        printf("\nWelcome to the Registration and Login System\n");
        printf("1. Register\n");
        printf("2. Login\n");
        printf("3. Exit\n");
        printf("Choose an option: ");

        if (scanf("%d", &choice) != 1) {
            printf("Invalid input. Please enter a number.\n");
            clearInputBuffer();
            choice = 0;
            continue;
        }
        clearInputBuffer();

        switch (choice) {
            case 1: registerUser(); break;
            case 2: loginUser(); break;
            case 3: printf("Goodbye!\n"); break;
            default:
                printf("Invalid option. Please try again.\n");
        }
    } while (choice != 3);

    return 0;
}

void clearInputBuffer() {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

int usernameExists(const char* username) {
    FILE* file = fopen("users.txt", "r");
    if (file == NULL) {
        return 0;
    }

    struct User fileUser;
    while (fscanf(file, "%s %s", fileUser.username, fileUser.password) == 2) {
        if (strcmp(fileUser.username, username) == 0) {
            fclose(file);
            return 1;
        }
    }

    fclose(file);
    return 0;
}

void registerUser() {
    struct User newUser;

    printf("--- Registration ---\n");
    printf("Enter a username: ");
    scanf("%s", newUser.username);
    clearInputBuffer();

    printf("Enter a password (must be 4 characters): ");
    scanf("%s", newUser.password);
    clearInputBuffer();

    if (strlen(newUser.password) != 4) {
        printf("Error: Password must be exactly 4 characters long.\n");
        return;
    }

    if (usernameExists(newUser.username)) {
        printf("Error: Username already exists. Please choose another one.\n");
        return;
    }

    FILE* file = fopen("users.txt", "a");
    if (file == NULL) {
        printf("Error: Could not open file for writing.\n");
        return;
    }

    fprintf(file, "%s %s\n", newUser.username, newUser.password);
    fclose(file);

    printf("Registration successful!\n");
}

void loginUser() {
    struct User inputUser;
    struct User fileUser;
    int loginSuccess = 0;

    printf("--- Login ---\n");
    printf("Enter your username: ");
    scanf("%s", inputUser.username);
    clearInputBuffer();

    printf("Enter your password: ");
    scanf("%s", inputUser.password);
    clearInputBuffer();

    FILE* file = fopen("users.txt", "r");
    if (file == NULL) {
        printf("Invalid username or password!\n");
        return;
    }
    
    while (fscanf(file, "%s %s", fileUser.username, fileUser.password) == 2) {
        if (strcmp(inputUser.username, fileUser.username) == 0 &&
            strcmp(inputUser.password, fileUser.password) == 0) {
            loginSuccess = 1;
            break;
        }
    }

    fclose(file);

    if (loginSuccess) {
        printf("Login Successful!\n");
    } else {
        printf("Invalid username or password!\n");
    }
}

```

## Problem2
```C
#include <stdio.h>

int main() {
    int n, arr[100];
    int *ptr;

    printf("Enter number of elements: ");
    scanf("%d", &n);

    printf("Enter elements: ");
    for (ptr = arr; ptr < arr + n; ptr++) {
        scanf("%d", ptr);
    }

    printf("Array: ");
    for (ptr = arr; ptr < arr + n; ptr++) {
        printf("%d ", *ptr); 
    }
    printf("\n");

    int *max_ptr = arr;
    int *min_ptr = arr;

    for (ptr = arr + 1; ptr < arr + n; ptr++) {
        if (*ptr > *max_ptr) {
            max_ptr = ptr; 
        }
        if (*ptr < *min_ptr) {
            min_ptr = ptr; 
        }
    }
    printf("Maximum Element: %d\n", *max_ptr);
    printf("Minimum Element: %d\n", *min_ptr);

    int *start_ptr = arr;
    int *end_ptr = arr + n - 1;
    int temp;

    while (start_ptr < end_ptr) {
        temp = *start_ptr;
        *start_ptr = *end_ptr;
        *end_ptr = temp;

        start_ptr++;
        end_ptr--;
    }

    printf("Reversed Array: ");
    for (ptr = arr; ptr < arr + n; ptr++) {
        printf("%d ", *ptr);
    }
    printf("\n");

    return 0;
}
```
