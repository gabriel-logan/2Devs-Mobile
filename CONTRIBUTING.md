# 2Devs-Mobile - Contribution Guide

## How to Contribute

1. **Fork the Repository**

   - Fork the 2Devs-Mobile repository to your GitHub account.

2. **Clone the Repository**
   - Clone the forked repository to your local environment:
     ```
     git clone https://github.com/gabriel-logan/2Devs-Mobile.git
     ```
3. **Commit and Push**

   - Commit your changes and push them to the forked repository:
     ```
     git add .
     git commit -m "Concise description of the changes"
     git push origin my-feature
     ```

4. **Open a Pull Request (PR)**
   - Go to the forked repository on GitHub and open a PR to the main branch of the project.

## Generating APPS (Android) (Command Line)

### Clean

This command will clean the android project from conflicting files and folders.

```bash
cd android && ./gradlew clean
```

### Debug AAB

```bash
npx react-native build-android --mode=debug
```

### Debug APK's

```bash
cd android && ./gradlew assembleDebug
```

### Release APK

```bash
cd android && ./gradlew assembleRelease
```

### Release AAB -- REQUIRED INFONEEDED

```bash
npx react-native build-android --mode=release
```

### INFONEEDED

You need to pass the following env var to the android/gradle.properties file:

```properties
MYAPP_UPLOAD_STORE_FILE=typehere.jks
MYAPP_UPLOAD_KEY_ALIAS=typehere
MYAPP_UPLOAD_STORE_PASSWORD=typehere
MYAPP_UPLOAD_KEY_PASSWORD=typehere
```

## Contribution Guidelines

- Follow the coding standards of the language you're contributing to (JavaScript, TypeScript, Java, etc.).
- Keep the code clean and readable.
- Add tests for new functionalities or bug fixes.
- Properly document the changes made, including updates to README if necessary.
- Be respectful to other contributors and maintain a collaborative environment.

## License

By contributing to 2Devs-Mobile, you agree that your contributions will be licensed under the MIT license. Make sure you're familiar with the terms of this license.

#### OTHERS

´´´
splits {
abi {
reset()
enable true
universalApk true
include "armeabi-v7a", "arm64-v8a", "x86", "x86_64"
}
}
´´´
