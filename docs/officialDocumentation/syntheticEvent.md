# Synthetic Event

* Cross-browser wrapper around the browser’s native event. 
* It has the same interface as the browser’s native event, including `stopPropagation()` and `preventDefault()`, except the events work identically across all browsers.
* Every `SyntheticEvent` object has the following attributes:

```ts
boolean bubbles
boolean cancelable
DOMEventTarget currentTarget
boolean defaultPrevented
number eventPhase
boolean isTrusted
DOMEvent nativeEvent
void preventDefault()
boolean isDefaultPrevented()
void stopPropagation()
boolean isPropagationStopped()
void persist()
DOMEventTarget target
number timeStamp
string type
```

## Event Pooling

* `SyntheticEvent` is pooled
* The object will be reused and all properties will be nullified after the event callback has been invoked. 
* This is for performance reasons. 
* You cannot access the event in an asynchronous way.

```ts
function onClick(event) {
    console.log(event); // => nullified object.
    console.log(event.type); // => "click"
    const eventType = event.type; // => "click"

    setTimeout(function() {
        console.log(event.type); // => null
        console.log(eventType); // => "click"
    }, 0);

    // Won't work. this.state.clickEvent will only contain null values.
    this.setState({clickEvent: event});

    // You can still export event properties.
    this.setSTate({eventType: event.type});
}
```

> Note: 
> If you want to access the event properties in an asynchronous way, you should call `event.persist()` on the event, 
> which will remove the synthetic event from the pool and allow references to the event to be retained by user code.

## Supported Events

* React normalizes events so that they have consistent properties across different browsers.

* The event handlers below are triggered by an event in the bubbling phase. 
* To register an event handler for the capture phase, append `Capture` to the event name;
* for example, instead of using 

```ts
onClick
```

* Use 

```ts
onClickCapture // to handle the click event in the capture phase
```

- [Clipboard Events](#clipboard-events)
- [Composition Events](#composition-events)
- [Keyboard Events](#keyboard-events)
- [Focus Events](#focus-events)
- [Form Events](#form-events)
- [Generic Events](#generic-events)
- [Mouse Events](#mouse-events)
- [Pointer Events](#pointer-events)
- [Selection Events](#selection-events)
- [Touch Events](#touch-events)
- [UI Events](#ui-events)
- [Wheel Events](#wheel-events)
- [Media Events](#media-events)
- [Image Events](#image-events)
- [Animation Events](#animation-events)
- [Transition Events](#transition-events)
- [Other Events](#other-events)

### Clipboard Events {#clipboard-events}

Event names:

```ts
onCopy onCut onPaste
```

Properties:

```ts
DOMDataTransfer clipboardData
```

### Composition Events {#composition-events}

Event names:

```ts
onCompositionEnd onCompositionStart onCompositionUpdate
```

Properties:

```ts
string data
```

### Keyboard Events {#keyboard-events}

Event names:

```ts
onKeyDown onKeyPress onKeyUp
```

Properties:

```ts
boolean altKey
number charCode
boolean ctrlKey
boolean getModifierState(key)
string key
number keyCode
string locale
number location
boolean metaKey
boolean repeat
boolean shiftKey
number which
```

* The `key` property can take any of the values documented in the [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#named-key-attribute-values).

### Focus Events {#focus-events}

Event names:

```ts
onFocus onBlur
```

* These focus events work on all elements in the React DOM, not just form elements.

Properties:

```ts
DomEventTarget relatedTarget
```

### Form Events {#form-events}

Event names:

```ts
onChange onInput onInvalid onReset onSubmit
```

### Generic Events {#generic-events}

Event names:

```ts
onError onLoad
```

### Mouse Events {#mouse-events}

Event names:

```ts
onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit
onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave
onMouseMove onMouseOut onMouseOver onMouseUp
```

* The `onMouseEnter` and `onMouseLeave` events propogate from the element being left to the one being entered instead of ordinary bubbling and do not have a capture phase.

Properties:

```ts
boolean altKey
number button
number buttons
number clientX
number clientY
boolean ctrlKey
boolean getModifierState(key)
boolean metaKey
boolean pageX
boolean pageY
DOMEventTarget relatedTarget
number screenX
number screenY
boolean shiftKey
```

### Pointer Events {#pointer-events}

Event names:

```ts
onPointerDown onPointerMove onPointerUp onPointerCancel onGotPointerCapture
onLostPointerCapture onPointerEnter onPointerLeave onPointerOver onPointerOut
```

The `onPointerEnter` and `onPointerLeave` events propagate from the element being left to the one being entered instead of ordinary bubbling and do not have a capture phase.

Properties:

As defined in the [W3 spec](https://www.w3.org/TR/pointerevents/), pointer events extend [Mouse Events](#mouse-events) with the following properties:

```ts
number pointerId
number width
number height
number pressure
number tangentialPressure
number tiltX
number tiltY
number twist
string pointerType
boolean isPrimary
```

A note on cross-browser support:

Pointer events are not yet supported in every browser (at the time of writing this article, supported browsers include: Chrome, Firefox, Edge, and Internet Explorer). React deliberately does not polyfill support for other browsers because a standard-conform polyfill would significantly increase the bundle size of `react-dom`.

If your application requires pointer events, we recommend adding a third party pointer event polyfill.

### Selection Events {#selection-events}

Event names:

```ts
onSelect
```