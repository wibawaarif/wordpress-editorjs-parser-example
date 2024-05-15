"use client"

import React, { useRef, useEffect, useState } from "react"
import EditorJS from "@editorjs/editorjs"

const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

// Function to extract list items from innerHTML
const extractListItems = (html: any) => {
  const listType = html.includes('<ol>') ? 'ordered' : 'unordered';
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const items = Array.from(doc.querySelectorAll('li')).map(item => item?.textContent?.trim());
  return { listType, items };
};

const transformData = (data: any) => {
  return data.map((block: any) => {
    const id = generateId();
    
    if (block.blockName === "core/heading") {
      return {
        id: id,
        type: "header",
        data: {
          text: block.innerContent[0].replace(/<\/?[^>]+(>|$)/g, ""), // Strips HTML tags
          level: block.attrs.level
        }
      };
    }
    
    // Handle other block types (paragraph, list, etc.) here
    // Example for paragraph:
    if (block.blockName === "core/paragraph") {
      return {
        id: id,
        type: "paragraph",
        data: {
          text: block.innerContent[0].replace(/<\/?[^>]+(>|$)/g, "")
        }
      };
    }

    if (block.blockName === "core/list") {
      const { listType, items } = extractListItems(block.innerHTML || '');
      return {
        id: id,
        type: "list",
        data: {
          style: listType === 'ordered' ? 'ordered' : 'unordered',
          items: items
        }
      };
    }

    // Add more conditions for different block types

    // Default return in case the block type is not handled
    return {
      id: id,
      type: "unknown",
      data: {
        content: block.innerContent[0]
      }
    };
  });
};


export default function Editor({ valueToShow: valueToShow }: any) {
  const [isMounted, setIsMounted] = useState(false)
  const ref = useRef<EditorJS>();
  const [finalResult, setFinalResult] = useState([])

  const initializeEditor = async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default
    const Header = (await import("@editorjs/header")).default
    const Paragraph = (await import("@editorjs/paragraph"))
    const List = (await import("@editorjs/list")).default

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        tools: {
          header: Header,
          paragraph: Paragraph,
          list: List
        },
      })

      ref.current = editor
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, [])

  useEffect(() => {
    const init = async () => {
      await initializeEditor();
    }

    if (isMounted) {
      init();
      return () => {
        if (ref.current) {
          ref.current.destroy();
        }
      }
    }
  }, [isMounted])

  const revalidateEditor = async (result: any) => {
    const EditorJS = (await import("@editorjs/editorjs")).default
    const Header = (await import("@editorjs/header")).default
    const Paragraph = (await import("@editorjs/paragraph"))
    const List = (await import("@editorjs/list")).default


      console.log('terpanggil')
      const editor = new EditorJS({
        holder: "editorjs",
        tools: {
          header: Header,
          paragraph: Paragraph,
          list: List
        },
        data: {
          blocks: result,
          time:1715781734064,
          version: "2.29.1"
        }
      })

      ref.current = editor

  }


  useEffect(() => {
    if (valueToShow) {
      console.log('test', valueToShow)
      const reFormatData = transformData(valueToShow);
      console.log('ini value', reFormatData)

      revalidateEditor(reFormatData);
    }
  }, [valueToShow])

  const save = () => {
    if (ref.current) {
      ref.current.save().then((outputData) => {
        console.log("Article data: ", outputData);
        alert(JSON.stringify(outputData))
      })
    }
  }

  return (
    <>
      <div id="editorjs" className="prose max-w-full min-h-screen" />
    </>
  )


}