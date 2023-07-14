import BucketList from "@/components/bucket_list";

export default function BucketListPage(){
    const list = [
        { id: 0, title: 'Big Bellies', seen: false },
        { id: 1, title: 'Lunar Landscape', seen: false },
        { id: 2, title: 'Terracotta Army', seen: true },
    ]
    return (
        <BucketList artList={list}></BucketList>
    )
}