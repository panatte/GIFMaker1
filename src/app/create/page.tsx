'use client';

import dynamic from 'next/dynamic';

// ใช้ dynamic import เพื่อโหลดคอมโพเนนท์ EditorWithStore เฉพาะฝั่งไคลเอนต์
const DynamicEditor = dynamic(() => import('../../components/EditorNew').then(mod => mod.EditorWithStore), {
  ssr: false, // ปิดการ SSR
});
function EditorPage() {
  return (
    <div>
      <DynamicEditor />
    </div>
  );
}

EditorPage.displayName = "EditorPage";

export default EditorPage;
