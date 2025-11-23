import { Suspense, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ListRow } from 'tosslib';

const DelayedFallback = () => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShown(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!isShown) {
    return null;
  }

  return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="로딩 중" />} />;
};

export const StatusHandlingBoundary = ({ children }: { children: React.ReactElement }) => {
  return (
    <ErrorBoundary
      fallback={<ListRow contents={<ListRow.Texts type="1RowTypeA" top="네트워크 에러가 발생했습니다." />} />}
    >
      <Suspense fallback={<DelayedFallback />}>{children}</Suspense>
    </ErrorBoundary>
  );
};
