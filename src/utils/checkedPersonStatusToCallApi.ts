type PersonStatusProps = {
  active: boolean;
  pending: boolean;
  expired: boolean;
};

export function checkedPersonStatusToCallApi(
  checkedPersonStatus: PersonStatusProps
) {
  const status = [];

  if (!checkedPersonStatus) {
    return '';
  }

  if (checkedPersonStatus.active) {
    status.push(2);
  }

  if (checkedPersonStatus.pending) {
    status.push(1);
  }

  if (checkedPersonStatus.expired) {
    status.push(3);
  }

  return `&status=${status.join(',')}`;
}
