import { Box, Stack, Typography } from '@mui/material'
import { ROUTES } from 'constant'

import { useNavigate } from 'react-router'

const ArrowBack = () => {
    const navigate = useNavigate()
    return (

        <Stack direction="row" alignItems="center" spacing={1} mb={3} mt={2}>
            <Box
                component="img"
                onClick={() => navigate(ROUTES.LOGIN)}
                src="/assets/icons/BackIcon.svg"
                alt="Back"
                sx={{ height: 24, width: 24, cursor: 'pointer' }}
            />
            <Typography >Back to login</Typography>
        </Stack>

    )
}

export default ArrowBack
