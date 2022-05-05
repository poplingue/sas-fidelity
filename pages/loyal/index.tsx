import { useEffect, useState } from "react";
import {
  Grid,
  Table,
  useCollator,
  useAsyncList,
  Text,
} from "@nextui-org/react";
import Link from "next/link";

type Items = {
  email: string;
  id: number;
};

export default function All() {
  const [loyals, setLoyals] = useState([]);
  const collator = useCollator({ numeric: true });

  const load = async () => {
    const res = await fetch(`/api/loyal/all`, {
      method: "GET",
    });

    const data = await res.json();

    return {
      items: data,
    };
  };

  const sort = async ({ items, sortDescriptor }) => {
    return {
      items: items.sort((a, b) => {
        let first = a[sortDescriptor.column];
        let second = b[sortDescriptor.column];
        let cmp = collator.compare(first, second);
        if (sortDescriptor.direction === "descending") {
          cmp *= -1;
        }
        return cmp;
      }),
    };
  };

  const list = useAsyncList({ load, sort });

  useEffect(() => {
    async function getData() {
      const res = await fetch(`/api/loyal/all`, {
        method: "GET",
      });

      return await res.json();
    }

    if (!loyals.length) {
      getData().then((data) => {
        setLoyals(data);
      });
    }
  }, [loyals.length]);

  return (
    <Grid.Container>
      <Grid>
        <Table
          aria-label="table with emails"
          bordered
          shadow={false}
          headerLined
          striped
          compact
          sortDescriptor={list.sortDescriptor}
          onSortChange={list.sort}
        >
          <Table.Header>
            <Table.Column key="email" allowsSorting>
              Email
            </Table.Column>
            <Table.Column key="cash" allowsSorting>
              Passage
            </Table.Column>
          </Table.Header>
          <Table.Body items={list.items} css={{}}>
            {(item: Items) => (
              <Table.Row key={item.email}>
                {(columnKey) => (
                  <Table.Cell>
                    {columnKey === "email" ? (
                      <Link href={`/loyal/${item.id}`}>
                        <Text
                          as="span"
                          size="1rem"
                          css={{
                            textDecoration: "underline",
                            color: "#0070F3",
                          }}
                        >
                          {item[columnKey]}
                        </Text>
                      </Link>
                    ) : (
                      item[columnKey]
                    )}
                  </Table.Cell>
                )}
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Grid>
    </Grid.Container>
  );
}
