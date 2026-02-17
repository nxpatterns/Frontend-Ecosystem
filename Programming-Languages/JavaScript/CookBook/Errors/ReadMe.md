# Fehler

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Error Class](#error-class)
  - [Eigenschaften](#eigenschaften)
  - [Methoden](#methoden)
- [Error Stack](#error-stack)
  - [Simple Formatierung](#simple-formatierung)
  - [NodeJS Umgebungen](#nodejs-umgebungen)
    - [captureStackTrace()](#capturestacktrace)
    - [prepareStackTrace()](#preparestacktrace)
    - [stackTraceFilter()](#stacktracefilter)
    - [Error.captureStackTrace - Example 1](#errorcapturestacktrace---example-1)
    - [Error.captureStackTrace - Example 2](#errorcapturestacktrace---example-2)
    - [stacktrace-gps-Library](#stacktrace-gps-library)
  - [Browser Umgebungen](#browser-umgebungen)
    - [Error.captureStackTrace in Browser-Umgebungen verfügbar machen](#errorcapturestacktrace-in-browser-umgebungen-verfügbar-machen)
    - [stacktrace-js-Library](#stacktrace-js-library)
  - [`stacktrace-gps` vs. `stacktrace-js``](#stacktrace-gps-vs-stacktrace-js)
- [Miscellaneaus](#miscellaneaus)
  - [Error Object](#error-object)
  - [Simple Error Instanzen](#simple-error-instanzen)
  - [Error.Stack Libs](#errorstack-libs)
  - [Angular Errors (Under Construction)](#angular-errors-under-construction)

<!-- /code_chunk_output -->

## Error Class

Die `Error`\-Klasse in JavaScript hat eine Reihe von Eigenschaften und Methoden, die für die Arbeit mit Fehlern nützlich sind. Hier sind die wichtigsten:

### Eigenschaften

- `message`: Die Fehlermeldung, die vom `Error`\-Objekt dargestellt wird.
- `name`: Der Name der Fehlerklasse, z.B. `"Error"`, `"TypeError"`, `"SyntaxError"` usw.
- `stack`: Der Stack-Trace des Fehlers als Zeichenfolge.

### Methoden

- `toString()`: Gibt die Fehlermeldung als Zeichenfolge zurück. In der Regel wird der Name der Fehlerklasse gefolgt von einem Doppelpunkt und der Fehlermeldung ausgegeben.

- `stackTraceLimit`: Gibt die maximale Anzahl von Frames zurück, die im Stack-Trace enthalten sein dürfen.

- `captureStackTrace(targetObject, constructorOpt)`: Erfasst den Stack-Trace und legt ihn auf dem angegebenen Objekt fest.

- `prepareStackTrace(error, structuredStackTrace)`: Eine statische Methode, die von Node.js zur Verfügung gestellt wird, um den Stack-Trace in einem benutzerdefinierten Format zu generieren.

- `stackTraceFilter`: Eine statische Methode, die von Node.js zur Verfügung gestellt wird, um den Stack-Trace in einem benutzerdefinierten Format zu filtern.

- `stackTraceLimit`: Eine statische Eigenschaft, die die maximale Anzahl von Frames im Stack-Trace angibt.

- `captureStackTrace()`, `prepareStackTrace()` **und** `stackTraceFilter()` **sind speziell für Node.js und sind in Browserumgebungen nicht verfügbar.**

## Error Stack

### Simple Formatierung

```js
function myFunction() {
  try {
    // Hier wird ein Fehler absichtlich ausgelöst:
    throw new Error('Something went wrong!');
  } catch (error) {
    const stackTrace = error.stack
      .split('\n')
      .map((line) => line.trim())
      .join('\n');
    console.error(`Error Stack Trace:\n${stackTrace}`);
  }
}
myFunction();
```

### NodeJS Umgebungen

#### captureStackTrace()

Die `captureStackTrace()`\-Methode wird in Node.js automatisch von der `Error`\-Klasse aufgerufen, wenn ein neues `Error`\-Objekt erstellt wird. Sie kann jedoch auch manuell aufgerufen werden, um den Stack-Trace auf einem beliebigen Objekt zu erfassen.

Hier ist ein Beispiel, das `captureStackTrace()` manuell aufruft und den Stack-Trace auf einem benutzerdefinierten Objekt festlegt:

```js
`var obj = {};
Error.captureStackTrace(obj);

console.log(obj.stack);
```

Dieses Beispiel erstellt ein leeres Objekt `obj` und ruft dann `Error.captureStackTrace()` auf, um den Stack-Trace auf dem Objekt festzulegen. Anschließend wird der Stack-Trace auf der Konsole ausgegeben.

#### prepareStackTrace()

Die `prepareStackTrace()`\-Methode wird von Node.js zur Verfügung gestellt, um den Stack-Trace in einem benutzerdefinierten Format zu generieren. Sie erwartet zwei Argumente: das `Error`\-Objekt und ein Array von Stack-Trace-Elementen.

Hier ist ein Beispiel, das `prepareStackTrace()` verwendet, um den Stack-Trace in einem benutzerdefinierten Format auszugeben:

```js
function customStackTrace(err) {
  return err.stack.map(function (frame) {
    return {
      functionName: frame.getFunctionName(),
      fileName: frame.getFileName(),
      lineNumber: frame.getLineNumber(),
      columnNumber: frame.getColumnNumber(),
    };
  });
}

var err = new Error('Custom error message');
Error.captureStackTrace(err);

var stackTrace = (err.stackTraceLimit = Infinity);
var formattedStackTrace = (err.stackTraceFilter = customStackTrace);
console.log(err.stack);
```

Dieses Beispiel definiert eine benutzerdefinierte `customStackTrace()`\-Methode, die jedes Stack-Trace-Element in ein Objekt mit den Eigenschaften `functionName`, `fileName`, `lineNumber` und `columnNumber` umwandelt. Dann wird ein neues `Error`\-Objekt erstellt und der Stack-Trace mit `Error.captureStackTrace()` erfasst. Schließlich werden die `stackTraceLimit`\- und `stackTraceFilter`\-Eigenschaften des Fehlers auf unendlich bzw. die `customStackTrace()`\-Methode gesetzt und der Stack-Trace auf der Konsole ausgegeben.

#### stackTraceFilter()

Die `stackTraceFilter()`\-Methode wird ebenfalls von Node.js zur Verfügung gestellt und ermöglicht es, den Stack-Trace in einem benutzerdefinierten Format zu filtern. Sie erwartet ein Array von Stack-Trace-Elementen als Argument und gibt ein neues Array von Stack-Trace-Elementen zurück.

Hier ist ein Beispiel, das `stackTraceFilter()` verwendet, um den Stack-Trace zu filtern und nur die Elemente zurückzugeben, die den Dateinamen "app.js" enthalten:

```js
function customStackTraceFilter(stackTrace) {
  return stackTrace.filter(function (frame) {
    return frame.getFileName().indexOf('app.js') !== -1;
  });
}

var err = new Error('Custom error message');
Error.captureStackTrace(err);

var stackTrace = (err.stackTraceLimit = Infinity);
var formattedStackTrace = (err.stackTraceFilter =
  customStackTraceFilter);
console.log(err.stack);
```

#### Error.captureStackTrace - Example 1

```js
class MyError extends Error {
  constructor(message) {
    super(message);
    this.name = 'MyError';
    Error.captureStackTrace(this, MyError);
    this.stackTraceLimit = 10;
  }
}

function myFunction() {
  try {
    // Hier wird ein Fehler absichtlich ausgelöst:
    throw new MyError('Something went wrong!');
  } catch (error) {
    console.error(error.stack);
  }
}

myFunction();
```

#### Error.captureStackTrace - Example 2

`captureStackTrace` ist eine statische Methode der `Error`\-Klasse, die zum Erfassen des Stack-Trace verwendet wird. Diese Methode ermöglicht es, den Stack-Trace von einem bestimmten Punkt aus zu erfassen, anstatt ihn von der Stelle zu erfassen, an der der `Error`\-Objekt erstellt wird. Dadurch können Sie den Fehlerstapel genauer steuern und den genauen Startpunkt des Stacks festlegen.

Die `captureStackTrace`\-Methode hat zwei Parameter:

- `targetObject`: das Objekt, auf dem der Stack-Trace festgelegt werden soll.
- `constructorOpt` (optional): die Funktion, die den `targetObject` erstellt hat. Wenn dieser Parameter weggelassen wird, wird die `captureStackTrace`\-Methode den Konstruktor des Objekts als den Ersteller des Stacks betrachten.

```js
class MyError extends Error {
  constructor(message) {
    super(message);
    this.name = 'MyError';
    Error.captureStackTrace(this, MyError);
  }
}

function myFunction() {
  try {
    // Hier wird ein Fehler absichtlich ausgelöst:
    throw new MyError('Something went wrong!');
  } catch (error) {
    console.error(error.stack);
  }
}

myFunction();
```

#### stacktrace-gps-Library

`stacktrace-gps`-Library ermöglicht einen Error-Stack-Trace in eine formatierte Form umzuwandeln:

```js
const StackTraceGPS = require('stacktrace-gps');

function getErrorWithStackTrace() {
  const error = new Error('Something went wrong!');
  const stackTraceGPS = new StackTraceGPS();

  return StackTrace.fromError(error)
    .then((stackTrace) => {
      return stackTraceGPS.pinpoint(stackTrace);
    })
    .then((stackTrace) => {
      error.stack = stackTrace;
      return error;
    });
}

getErrorWithStackTrace().then((error) => {
  console.error(error);
});
```

`stacktrace-gps`-Library ist auf die source-map-Library angewiesen, um den ursprünglichen Quellcode zu lokalisieren, was zu einem langsameren und ressourcenintensiveren Prozess führen kann.

Mit `stacktrace-gps` kann man den ursprünglichen Quellcode einer Fehlermeldung ermitteln und zusätzliche Informationen wie Funktionennamen, Dateinamen, Zeilen- und Spaltennummern hinzufügen:

```js
const StackTraceGPS = require('stacktrace-gps');

function formatStackTrace(stackTrace) {
  const stackTraceGPS = new StackTraceGPS();

  return Promise.all(
    stackTrace.map((frame) => {
      return new Promise((resolve) => {
        stackTraceGPS.pinpoint(frame).then((originalFrame) => {
          const formattedFrame = {
            functionName: originalFrame.getFunctionName(),
            fileName: originalFrame.getFileName(),
            lineNumber: originalFrame.getLineNumber(),
            columnNumber: originalFrame.getColumnNumber(),
          };
          resolve(formattedFrame);
        });
      });
    }),
  );
}

function getErrorWithStackTrace() {
  const error = new Error('Something went wrong!');
  return StackTrace.fromError(error)
    .then((stackTrace) => {
      return formatStackTrace(stackTrace);
    })
    .then((formattedStackTrace) => {
      error.stack = formattedStackTrace;
      return error;
    });
}

getErrorWithStackTrace().then((error) => {
  console.error(error);
});
```

Zunächst wird `stacktrace-gps` verwendet, um den ursprünglichen Quellcode für jeden Frame im Stack-Trace zu ermitteln. Anschließend werden die Formatierungsinformationen für jeden Frame extrahiert und in ein neues Array eingefügt. Schließlich wird das neue Array der `stack`-Eigenschaft des `Error`-Objekts zugewiesen.

### Browser Umgebungen

#### Error.captureStackTrace in Browser-Umgebungen verfügbar machen

```js
if (!Error.captureStackTrace) {
  Error.captureStackTrace = function (
    targetObject,
    constructorOpt,
  ) {
    var stack = new Error().stack;
    if (stack) {
      Object.defineProperty(targetObject, 'stack', {
        value: stack,
      });
    }
  };
}
```

#### stacktrace-js-Library

`stacktrace-js`\-Library ermöglicht einen Error-Stack-Trace in einer browserfreundlichen Umgebung zu generieren.

```js
const StackTrace = require('stacktrace-js');

function getErrorWithStackTrace() {
  const error = new Error('Something went wrong!');
  return StackTrace.fromError(error).then((stackTrace) => {
    error.stack = stackTrace;
    return error;
  });
}

getErrorWithStackTrace().then((error) => {
  console.error(error);
});
```

In diesem Beispiel wird die `stacktrace-js`\-Library verwendet, um den Error-Stack-Trace zu generieren und ihn an die `stack`\-Eigenschaft des `Error`\-Objekts anzuhängen. Beachten Sie jedoch, dass das Hinzufügen einer benutzerdefinierten `stack`\-Eigenschaft zu einem `Error`\-Objekt nicht spezifiziert ist und in verschiedenen Browsern unterschiedlich behandelt werden kann.

### `stacktrace-gps` vs. `stacktrace-js``

Beide Libraries sind in der Lage, die Informationen des Stack-Traces zu verarbeiten und zu formatieren, um eine genauere Darstellung der Fehlerursache bereitzustellen. Allerdings gibt es Unterschiede in der Funktionsweise und Verwendung der beiden Libraries.

`stacktrace-gps` ist eine Library, die speziell für Node.js entwickelt wurde. Sie nutzt die Source-Map-Informationen, um den ursprünglichen Quellcode der Anwendung zu finden und den Stack-Trace mit genauen Informationen über die Funktionen, Dateien und Zeilennummern zu versehen. Dadurch können Entwickler den Fehlerort leichter erkennen und beheben.

Auf der anderen Seite ist `stacktrace-js` eine Library, die in Browser-Umgebungen eingesetzt wird und den Zugriff auf den Stack-Trace ermöglicht. Sie nutzt ähnliche Techniken wie `stacktrace-gps`, um den Stack-Trace zu formatieren und genauere Informationen zur Fehlerursache bereitzustellen. `stacktrace-js` kann jedoch die Source-Map-Informationen nicht direkt nutzen, um den ursprünglichen Quellcode zu finden. Stattdessen müssen Entwickler die `source-map`\-Library verwenden, um die Source-Map-Informationen manuell zu verarbeiten.

Insgesamt sind beide Libraries sehr nützlich und können Entwicklern dabei helfen, Probleme in ihren Anwendungen schneller zu erkennen und zu beheben. Die Wahl zwischen den beiden Libraries hängt von der Umgebung ab, in der die Anwendung ausgeführt wird, und von den spezifischen Anforderungen an die Stack-Trace-Verarbeitung.

## Miscellaneaus

### Error Object

Ein Fehlerobjekt in JavaScript besteht normalerweise aus drei Bestandteilen:

1. **Name**: Der Name des Fehlers, z.B. "TypeError" oder "SyntaxError". Dies gibt an, um welche Art von Fehler es sich handelt.

2. **Message**: Eine beschreibende Nachricht, die näher erläutert, was genau schief gelaufen ist.

3. **Stack-Trace**: Eine Liste von Funktionsaufrufen und Zeilennummern, die den Aufrufpfad bis zum Fehler zeigen. Dies kann sehr hilfreich sein, um den genauen Ort des Fehlers zu finden und zu beheben.

### Simple Error Instanzen

Wenn ein Fehler in JavaScript nicht eine Instanz des ErrorEvents ist, kann es eine Instanz einer der folgenden Fehlerklassen sein:

1. Error: Die grundlegende Fehlerklasse in JavaScript. Sie wird verwendet, um allgemeine Fehler zu repräsentieren, die während der Ausführung von Code auftreten können.

2. TypeError: Eine Unterklasse von Error, die verwendet wird, wenn ein Wert nicht vom erwarteten Typ ist oder auf eine nicht vorhandene Eigenschaft eines Objekts zugegriffen wird.

3. RangeError: Eine Unterklasse von Error, die verwendet wird, wenn eine Zahl außerhalb des gültigen Bereichs liegt. Zum Beispiel, wenn versucht wird, einen Wert außerhalb des Bereichs einer numerischen Variable zu setzen.

4. ReferenceError: Eine Unterklasse von Error, die verwendet wird, wenn versucht wird, auf eine nicht definierte Variable oder Funktion zuzugreifen.

5. SyntaxError: Eine Unterklasse von Error, die verwendet wird, wenn der Code eine ungültige Syntax aufweist. Zum Beispiel, wenn eine Klammer oder ein Semikolon fehlt oder eine unbekannte Schlüsselwort verwendet wird.

6. EvalError: Eine Unterklasse von Error, die normalerweise nicht in modernen Browsern verwendet wird. Sie wird verwendet, wenn ein Fehler im Zusammenhang mit der Verwendung der eval()-Funktion auftritt.

Hier sind weitere Fehlerklassen in JavaScript:

1. URIError: Eine Unterklasse von Error, die verwendet wird, wenn ein ungültiger URI (Uniform Resource Identifier) verwendet wird.

2. DOMException: Eine Fehlerklasse, die von der Document Object Model (DOM)-API verwendet wird, um Fehler zu melden, die im Zusammenhang mit der Manipulation von Dokumenten auftreten.

3. Web API-spezifische Fehler: Einige Web-APIs definieren ihre eigenen Fehlerklassen. Beispielsweise definiert die Fetch-API die Fehlerklassen `TypeError` und `AbortError`.

4. Benutzerdefinierte Fehlerklassen: Entwickler können ihre eigenen Fehlerklassen definieren, indem sie die `Error`\-Klasse erweitern.

### Error.Stack Libs

Es gibt mehrere JavaScript-Bibliotheken, die den Inhalt von `error.stack`\-Objekten in einem formatierten und lesbareren Format ausgeben können. Hier sind einige Beispiele:

1. StackTrace.js: Eine Bibliothek für den Browser, die den Aufrufstapel in ein Array von Stack-Trace-Objekten konvertiert und eine Vielzahl von nützlichen Methoden bereitstellt, um das Traceback in verschiedenen Formaten (HTML, JSON, usw.) auszugeben.

2. TraceKit: Eine Bibliothek für den Browser, die den Aufrufstapel extrahiert und in ein Array von Stack-Trace-Objekten umwandelt. Es bietet auch Methoden zum Filtern und Formatieren des Tracebacks.

3. StackTracey: Eine Bibliothek für den Node.js-Server, die den Aufrufstapel in einem formatierten und lesbareren Format ausgibt, einschließlich Farbcodierung und Syntaxhervorhebung.

4. PrettyError: Eine Bibliothek für den Node.js-Server, die den Aufrufstapel in einem lesbareren Format ausgibt und die Ausgabe in Farbe formatiert.

### Angular Errors (Under Construction)

```shell
Fehlercode	Fehlername
NG0000	Angular konnte nicht initialisiert werden.
NG0100	ExpressionChangedAfterItHasBeenCheckedError
NG0200	CircularDependencyError
NG0201	NoProviderError
NG0202	MixinCircularReferenceError
NG0203	InjectFromWrongContextError
NG0204	NullInjectorError
NG0205	StaticInjectorError
NG0206	NotSupportedError
NG0207	AbstractProviderError
NG0208	NoAnnotationError
NG0209	InvalidProviderError
NG0210	OutOfBoundsError
NG0211	TypeNotBoundError
NG0212	NoAnnotationError
NG0213	OpaqueTokenError
NG0214	AbstractBindingError
NG0215	CyclicDependencyError
NG0216	InvalidBindingError
NG0217	NoComponentFactoryError
NG0218	ComponentLoadingError
NG0219	ModuleWithProvidersError
NG0220	MissingIterableDifferError
NG0221	MissingPipeError
NG0222	UnknownPipeError
NG0223	InvalidPipeTransformError
NG0224	PlatformAlreadyProvidedError
NG0225	PlatformNotSupportedError
NG0226	InvalidModuleError
NG0227	InjectionTokenNotFoundError
NG0228	InvalidDirectiveDeclarationError
NG0229	InvalidCmpIdError
NG0230	MultipleComponentError
NG0231	ComponentNotFoundInModuleError
NG0232	ComponentFactoryDependencyNotFoundError
NG0233	NoNgModuleError
NG0234	NoComponentFactoryError
NG0235	InvalidNgModuleError
NG0236	NoSuchElementError
NG0237	RequireNgModuleRefError
NG0238	RecursiveNgModuleImportError
NG0239	DevModeMissingAngularCoreInjectionError
NG0240	NoAnimationPlayerError
NG0241	QueryListChangesNotSupportedError
NG0242	TemplateRefNotFoundError
NG0243	ViewDestroyedError
NG0244	ChangeDetectionError
NG0245	QueryListAlreadyDirtyError
NG0246	ContentChildNotFoundError
NG0247	ContentChildrenNotFoundError
NG0248	ViewChildNotFoundError
NG0249	ViewChildrenNotFoundError
NG0250	StaticProviderError
NG0251	ValueProviderNotFoundError
NG0252	DirectiveNotFound
NG0253	ComponentNotFound
NG0254	TokenNotFoundError
NG0255	OptionalDependencyNotFoundError
NG0256	SkipSelfNotFoundError
NG0257	SelfNotFoundError
>> under construction
```
