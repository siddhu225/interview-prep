Sure! Here's a complete and easy-to-revise guide on the **Adapter Design Pattern in JavaScript**, including:

* What is Adapter Design Pattern
* Why it's used
* Real-world analogy
* Class-based examples
* When to use

---

## 🔷 What is the Adapter Design Pattern?

The **Adapter Pattern** is a structural design pattern that acts as a **bridge between two incompatible interfaces**. It allows classes with different interfaces to work together without changing their existing code.

Think of it like a **travel plug adapter** – it allows a plug of one shape to fit into a socket of another.

---

## ❓ Why Use It?

* To **integrate third-party libraries or legacy systems** without modifying their code.
* To enable **incompatible classes** to work together.
* To ensure **interface compatibility** without changing the source.

---

## 🧠 Real-world Analogy

> Imagine a US laptop with a flat-pin charger. It won’t fit in an Indian round-pin socket. You use a **plug adapter** to convert the shape of the plug, allowing it to fit and function — without modifying the laptop or socket.

---

## 🔧 Class-Based Example: Media Player Adapter

### 🎯 Goal:

A modern `MediaPlayer` only supports `.mp4`. You want to play `.vlc` and `.avi` using an adapter.

### ✅ Classes:

```js
// Target interface
class MediaPlayer {
  play(fileType, fileName) {
    throw new Error("Method not implemented");
  }
}

// Adaptee class (incompatible interface)
class AdvancedMediaPlayer {
  playVlc(fileName) {
    console.log("Playing VLC file:", fileName);
  }

  playAvi(fileName) {
    console.log("Playing AVI file:", fileName);
  }
}

// Adapter
class MediaAdapter extends MediaPlayer {
  constructor() {
    super();
    this.advancedPlayer = new AdvancedMediaPlayer();
  }

  play(fileType, fileName) {
    if (fileType === "vlc") {
      this.advancedPlayer.playVlc(fileName);
    } else if (fileType === "avi") {
      this.advancedPlayer.playAvi(fileName);
    } else {
      console.log("Unsupported format:", fileType);
    }
  }
}

// Client
class AudioPlayer extends MediaPlayer {
  play(fileType, fileName) {
    if (fileType === "mp4") {
      console.log("Playing MP4 file:", fileName);
    } else {
      const adapter = new MediaAdapter();
      adapter.play(fileType, fileName);
    }
  }
}

// Usage
const player = new AudioPlayer();

player.play("mp4", "movie.mp4");   // ✅ MP4 supported directly
player.play("vlc", "movie.vlc");   // ✅ Uses adapter
player.play("avi", "movie.avi");   // ✅ Uses adapter
player.play("mkv", "movie.mkv");   // ❌ Unsupported
```

---

## 🧩 Real-world Applications

| Use Case                      | Explanation                                                           |
| ----------------------------- | --------------------------------------------------------------------- |
| 💾 Integrating Legacy Code    | Wrap an old API to match your app's new interface.                    |
| 🔗 3rd-Party Libraries        | Adapt a third-party module's method names.                            |
| 🌐 Backend-to-Frontend Bridge | Convert inconsistent JSON field formats to frontend-friendly formats. |
| 🏗️ Angular Services Wrapping | Use adapter to normalize backend responses.                           |

---

## 🛠️ Another Mini Example: Socket Adapter

```js
// Old interface
class RoundPinSocket {
  plugIn() {
    console.log("Power from Round Pin Socket");
  }
}

// New plug incompatible with old socket
class FlatPinCharger {
  charge() {
    console.log("Charging device via Flat Pin");
  }
}

// Adapter
class SocketAdapter {
  constructor(flatPinCharger) {
    this.flatPinCharger = flatPinCharger;
  }

  plugIn() {
    this.flatPinCharger.charge();
  }
}

// Usage
const flatPlug = new FlatPinCharger();
const adapter = new SocketAdapter(flatPlug);

// Now it works with the RoundPinSocket expectation
adapter.plugIn(); // Charging device via Flat Pin
```

---

## ✅ When to Use Adapter Pattern?

* You want to use a **class that doesn’t match the required interface**.
* You want to **reuse existing code** without modifying it.
* You are dealing with **different data formats or APIs**.

---

## 📌 Summary Notes

| Aspect          | Detail                                                        |
| --------------- | ------------------------------------------------------------- |
| 🔧 Pattern Type | Structural                                                    |
| 🔄 Purpose      | Bridge incompatible interfaces                                |
| 📦 Uses         | Legacy code integration, 3rd-party APIs, format normalization |
| 🧰 Tools        | Classes, Composition, Wrapping objects                        |

---

Let me know if you’d like the **TypeScript version**, or if you want an **Angular use case**!
