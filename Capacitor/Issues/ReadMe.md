# Trouble Shooting

## Solving Kotlin Capacitor Incompatibilities

android/build.gradle

```gradle
// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {

    ext {
        kotlin_version = '1.9.22'
        javaVersion = JavaVersion.VERSION_17
    }

    repositories {
        google()
        mavenCentral()
         maven { url 'https://jitpack.io' }
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:8.2.1'
        classpath 'com.google.gms:google-services:4.4.0'
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}

apply from: "variables.gradle"

allprojects {
    repositories {
        google()
        mavenCentral()
         maven { url 'https://jitpack.io' }
    }

    tasks.withType(org.jetbrains.kotlin.gradle.tasks.KotlinCompile).configureEach {
        kotlinOptions {
            jvmTarget = '17'
        }
    }
}

subprojects {
    afterEvaluate { project ->
        if (project.hasProperty('android')) {
            android {
                compileOptions {
                    sourceCompatibility JavaVersion.VERSION_17
                    targetCompatibility JavaVersion.VERSION_17
                }
            }
        }
    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}
```

## node_modules/@capacitor/barcode-scanner/android/build.gradle

Invalid Dependencies, use this one instead:

```gradleext {
    junitVersion = project.hasProperty('junitVersion') ? rootProject.ext.junitVersion : '4.13.2'
    androidxAppCompatVersion = project.hasProperty('androidxAppCompatVersion') ? rootProject.ext.androidxAppCompatVersion : '1.6.1'
    androidxJunitVersion = project.hasProperty('androidxJunitVersion') ? rootProject.ext.androidxJunitVersion : '1.1.5'
    androidxEspressoCoreVersion = project.hasProperty('androidxEspressoCoreVersion') ? rootProject.ext.androidxEspressoCoreVersion : '3.5.1'
}

buildscript {
    ext.kotlin_version = project.hasProperty("kotlin_version") ? rootProject.ext.kotlin_version : '1.9.22'
    repositories {
        maven {
            url 'https://pkgs.dev.azure.com/OutSystemsRD/9e79bc5b-69b2-4476-9ca5-d67594972a52/_packaging/PublicArtifactRepository/maven/v1'
            name 'Azure'
            credentials {
                username = "optional"
                password = ""
            }
            content {
                includeGroup "com.github.outsystems"
            }
        }
        google()
        mavenCentral()
        flatDir {
            dirs 'libs'
        }
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:8.2.2'
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
    }
}

apply plugin: 'com.android.library'
apply plugin: 'kotlin-android'

android {
    namespace "com.capacitorjs.barcodescanner"
    compileSdk project.hasProperty('compileSdkVersion') ? rootProject.ext.compileSdkVersion : 34
    defaultConfig {
        minSdkVersion project.hasProperty('minSdkVersion') ? rootProject.ext.minSdkVersion : 26
        targetSdkVersion project.hasProperty('targetSdkVersion') ? rootProject.ext.targetSdkVersion : 34
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
    lintOptions {
        abortOnError false
    }
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_17
        targetCompatibility JavaVersion.VERSION_17
    }
}

repositories {

    google()
    mavenCentral()
}

dependencies {
    // implementation fileTree(dir: 'libs', include: ['*.aar', '*.jar'])
    implementation files('libs/OSBarcodeLib-Android-1.1.3.jar')
    implementation project(':capacitor-android')
    implementation "androidx.appcompat:appcompat:$androidxAppCompatVersion"
    implementation 'androidx.activity:activity-ktx:1.8.2'
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core-jvm:1.7.3'
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.3'
    implementation 'com.google.mlkit:barcode-scanning:17.2.0'
    implementation 'androidx.camera:camera-camera2:1.3.1'
    implementation 'androidx.camera:camera-lifecycle:1.3.1'
    implementation 'androidx.camera:camera-view:1.3.1'
    implementation 'androidx.activity:activity-compose:1.8.2'
    implementation 'androidx.compose.material3:material3:1.1.2'
    implementation 'androidx.compose.material3:material3-window-size-class:1.1.2'
    testImplementation "junit:junit:$junitVersion"
    androidTestImplementation "androidx.test.ext:junit:$androidxJunitVersion"
    androidTestImplementation "androidx.test.espresso:espresso-core:$androidxEspressoCoreVersion"
}

}
```
