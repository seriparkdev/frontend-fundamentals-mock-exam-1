import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { colors, ListRow } from 'tosslib';
import { parseError } from 'utils/errorParser';

const ErrorFallback = ({ error }: { error: Error }) => {
  const errorData = parseError(error);
  return (
    <ListRow
      contents={
        <ListRow.Texts
          type="2RowTypeA"
          top={`오류 발생 [${errorData.code}]`}
          topProps={{ fontWeight: 'bold', color: colors.grey900 }}
          bottom={errorData.message}
          bottomProps={{ color: colors.grey600 }}
        />
      }
    />
  );
};

export const StatusHandlingBoundary = ({ children }: { children: React.ReactElement }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<ListRow contents={<ListRow.Texts type="1RowTypeA" top="로딩 중" />} />}>{children}</Suspense>
    </ErrorBoundary>
  );
};
