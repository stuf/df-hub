import { useRouter } from 'next/router';

export default function CategoryType(props) {
  const router = useRouter();
  const { type } = router.query;
  return <div>Category type; {type}</div>;
}
