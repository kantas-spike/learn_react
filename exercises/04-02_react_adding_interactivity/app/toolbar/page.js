'use client'

import Toolbar from "@/components/toolbar";

export default function ToolbarPage() {
    return (
        <Toolbar onPlayMovie={() => alert('Playing!!')} onUploadImage={() => alert('Uploading!!')}></Toolbar>
    )
}