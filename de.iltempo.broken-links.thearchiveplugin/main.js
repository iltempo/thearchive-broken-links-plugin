// Test the regular expression here: https://regex101.com/r/DB3SlF/

const ownFilename = output.changeFile.filename;
const linkRegex = /\[\[((\d+)[^\]]*)\]\]/g
const links = new Map();
let body = "Broken Links:\n";

// Build up link map
for (let note of input.notes.all) {
  id = app.extractNoteID(note.filename);
  links.set(id, note.filename);
}

// Verify links
for (let note of input.notes.all) {
  noteName = note.filename;

  for (linkMatch of note.content.matchAll(linkRegex)) {
    id = linkMatch[2];
    linkName = linkMatch[1];
    expectedName = links.get(id);
    noteIssues = "";

    if (expectedName == undefined) {
      noteIssues += "  - Not found: '" + linkName + "'\n";
    } else if (linkName != expectedName) {
      noteIssues += "  - '" + linkName + "' → [[" + expectedName + "]]\n";
    }

    if (noteIssues != "") {
      body += "\n[[" + noteName + "]]\n\n";
      body += noteIssues;
    }
  }
}

output.changeFile.content = body;
