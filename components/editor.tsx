// "use client";

// import {
//     BlockNoteEditor,
//     PartialBlock
// } from "@blocknote/core";
// import { BlockNoteViewRaw, useBlockNote } from '@blocknote/react';
// import "@blocknote/core/style.css";
// import { useTheme } from "next-themes";

// interface EditorProps {
//     onChange: (value: string) => void;
//     initialContent?: string;
//     editable?: boolean; 
// };

// export const Editor = ({
//     onChange,
//     initialContent,
//     editable
// }: EditorProps) => {
//     const { resolvedTheme } = useTheme();

//     // Initialize the editor instance
//     const editor: BlockNoteEditor | null = useBlockNote({
//         editable,
//         initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
//     });

//     // Listen for changes in the editor content
//     editor?.onChange(() => {
//         onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
//     });

//     return (
//         <div>
//             <BlockNoteViewRaw
//                 editor={editor}
//                 theme={resolvedTheme === "dark" ? "dark" : "light"}
//             />
//         </div>
//     );
// }

"use client";

import {
    BlockNoteEditor,
    PartialBlock
} from "@blocknote/core";
import { BlockNoteViewRaw, useCreateBlockNote } from '@blocknote/react';
import "@blocknote/core/style.css";
import { useTheme } from "next-themes";
import { useEffect } from 'react';
import { useEdgeStore } from "@/lib/edgestore";

interface EditorProps {
    onChange: (value: string) => void;
    initialContent?: string;
    editable?: boolean;
};

const Editor = ({
    onChange,
    initialContent,
    editable = true,  // Default to true if not provided
}: EditorProps) => {
    const { resolvedTheme } = useTheme();
    const { edgestore } = useEdgeStore();

    const handleUpload = async (file: File) => {
        const response = await edgestore.publicFiles.upload({
            file
        });

        return response.url;
    }
 
    // Initialize the editor
    const editor: BlockNoteEditor | null = useCreateBlockNote({
        initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
    });

    // Use a side effect to handle content changes after the editor is created
    useEffect(() => {
        // Listen for changes in the editor content
if (editor) {
    editor.onChange(() => {
        // Use editor.document instead of editor.topLevelBlocks
        onChange(JSON.stringify(editor.document, null, 2));
    });
}
    uploadFile: handleUpload

    }, [editor, editable, onChange]);

    return (
        <div>
            <BlockNoteViewRaw
                editor={editor}
                theme={resolvedTheme === "dark" ? "dark" : "light"}
            />
        </div>
    );
}

export default Editor;



