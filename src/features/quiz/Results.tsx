import { QuizModel, selectQuestions } from "./quizSlice";
import {
  Button,
  Container,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { CSVLink } from "react-csv";
import { Enumerable } from "linq-javascript";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 350,
  },
  downloadContainer: {
    padding: theme.spacing(3),
  },
  contrastTextColor: {
    color: theme.palette.primary.contrastText,
  },
}));

class GeoupResult {
  name!: string;
  count!: number;
  total!: number;
  average!: number;
}

export function Results({ quiz }: { quiz: QuizModel }) {
  const classes = useStyles();

  const results = quiz.groups.map<GeoupResult>((group) => {
    const count = group.questions.length;
    const total = Enumerable.fromSource(group.questions).sum(
      (q) =>
        q.answer ??
        (() => {
          throw new Error(`No answer on question #${q.number}`);
        })()
    );
    const average = total / count;

    return { name: group.name, count, total, average };
  });

  const csvData = [
    [[quiz.groupsName ?? "Назва", "К-ть питань", "Сума балів", "Середнє"]],
    results.map((r) => [r.name, r.count, r.total, r.average]),
    [["Питання", "відповідь"]],
    selectQuestions(quiz)
      .select((q) => [`${q.number}.${q.value}`, q.answer])
      .toArray(),
  ].flat(1);

  return (
    <>
      <Container>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{quiz.groupsName ?? "Назва"}</TableCell>
                <TableCell align="right">К-ть питань</TableCell>
                <TableCell align="right">Сума балів</TableCell>
                <TableCell align="right">Середнє</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((result) => {
                return (
                  <TableRow key={result.name}>
                    <TableCell>{result.name}</TableCell>
                    <TableCell align="right">{result.count}</TableCell>
                    <TableCell align="right">{result.total}</TableCell>
                    <TableCell align="right">{result.average}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Container className={classes.downloadContainer}>
          <Button variant="contained" color="primary">
            <CSVLink
              data={csvData}
              filename={`Результати ${quiz.title}.csv`}
              className={classes.contrastTextColor}
            >
              Завантажити резульатат
            </CSVLink>
          </Button>
        </Container>
      </Container>
    </>
  );
}

export default Results;
